# cord

> ⚠️ **Work in progress.** cord is in early development — APIs may change and not all features are stable yet.

A minimal Discord bot library built directly on top of the Discord API — no abstractions you didn't ask for.

```ts
import { Bot } from '@neozmmv/cord';

const bot = new Bot(process.env.TOKEN!);

bot.addCommand('ping', 'Replies with Pong!', async (ctx) => {
  await ctx.sendMessage(`Pong! Hey ${ctx.user.username}`);
});

await bot.run();
```

---

## Why cord?

Most Discord libraries hide everything. cord gives you a clean API without taking away control.

- **No manual command registration** — `addCommand` handles it automatically on startup
- **No boilerplate** — one file, one bot, done
- **TypeScript-first** — full autocomplete on `ctx`, commands, and payloads
- **Direct API** — built on raw WebSocket + REST, no hidden magic
- **Event system** — listen to any Discord Gateway event with full type safety

---

## Installation

```bash
bun add @neozmmv/cord
# or
npm install @neozmmv/cord
```

> Requires [Bun](https://bun.sh) or Node.js 18+

---

## Getting Started

**1. Create a bot on the [Discord Developer Portal](https://discord.com/developers)**

**2. Set up your `.env`:**

```env
TOKEN=your_bot_token_here
```

**3. Create your bot:**

```ts
import { Bot } from '@neozmmv/cord';

const bot = new Bot(process.env.TOKEN!);

bot.addCommand('ping', 'Check if the bot is alive', async (ctx) => {
  await ctx.sendMessage('Pong!');
});

await bot.run();
console.log(`Online as ${bot.user?.username}`);
```

---

## Commands

### `bot.addCommand(name, description, handler, guildId?)`

Registers a slash command. Pass a `guildId` to register instantly in a specific server, or omit it for global registration (up to 1 hour to propagate).

```ts
// global command
bot.addCommand('help', 'Shows help', async (ctx) => {
  await ctx.sendMessage('Here is the help menu...');
});

// guild-only (instant)
bot.addCommand('admin', 'Admin only', async (ctx) => {
  await ctx.sendMessage('Admin panel');
}, process.env.GUILD_ID);
```

Command names must be lowercase and can only contain letters and numbers.

### Chaining

```ts
bot
  .addCommand('ping', 'Ping the bot', pingHandler)
  .addCommand('help', 'Show help', helpHandler)
  .addCommand('info', 'Server info', infoHandler);
```

---

## Context (slash commands)

Every command handler receives a `ctx` object:

```ts
bot.addCommand('info', 'Get info', async (ctx) => {
  ctx.commandName        // "info"
  ctx.user.username      // who used the command
  ctx.user.id            // their Discord ID
  ctx.guildId            // server ID
  ctx.channelId          // channel ID
  ctx.channel.name       // channel name
  ctx.locale             // user's locale ("en-US", "pt-BR", ...)

  await ctx.sendMessage('Hello!');
  await ctx.sendMessage('Only you can see this!', { ephemeral: true });
  await ctx.editMessage('Updated message!');
});
```

---

## Events

Listen to any Discord Gateway event with `bot.on()`. Every event is fully typed — autocomplete works out of the box.

```ts
import { Bot, Event } from '@neozmmv/cord';

bot.on(Event.MESSAGE_CREATE, async (ctx) => {
  if (ctx.content === '!hello') {
    const msgId = await ctx.sendMessage(`Hello, ${ctx.author.global_name}!`);
    await ctx.editMessage(msgId, 'Edited!');
  }
});

bot.on(Event.GUILD_MEMBER_ADD, (ctx) => {
  console.log(`New member: ${ctx.user.username}`);
});
```

Multiple handlers for the same event are supported:

```ts
bot.on(Event.MESSAGE_CREATE, handlerOne);
bot.on(Event.MESSAGE_CREATE, handlerTwo); // both will be called
```

### Available Events

```ts
Event.READY
Event.RESUMED
Event.CHANNEL_CREATE / UPDATE / DELETE / PINS_UPDATE
Event.GUILD_CREATE / UPDATE / DELETE
Event.GUILD_BAN_ADD / REMOVE
Event.GUILD_EMOJIS_UPDATE / STICKERS_UPDATE
Event.GUILD_MEMBER_ADD / UPDATE / REMOVE
Event.MESSAGE_CREATE / UPDATE / DELETE / DELETE_BULK
Event.MESSAGE_REACTION_ADD / REMOVE / REMOVE_ALL
Event.PRESENCE_UPDATE
Event.TYPING_START
Event.VOICE_STATE_UPDATE / SERVER_UPDATE
Event.INTERACTION_CREATE
Event.THREAD_CREATE / UPDATE / DELETE / MEMBER_UPDATE
```

---

## Message Context

Handlers for `Event.MESSAGE_CREATE` receive a `MessageContext` with helper methods:

```ts
bot.on(Event.MESSAGE_CREATE, async (ctx) => {
  ctx.content          // message content
  ctx.author.username  // who sent the message
  ctx.channelId        // channel ID
  ctx.guildId          // server ID

  const msgId = await ctx.sendMessage('Pong!');
  await ctx.editMessage(msgId, 'Pong! (edited)');
});
```

---

## Intents

cord includes sensible defaults — `Guilds`, `GuildMessages`, `MessageContent`, and `GuildMembers`. You can customize:

```ts
import { Bot, Intent } from '@neozmmv/cord';

// use defaults
const bot = new Bot(process.env.TOKEN!);

// custom intents
const bot = new Bot(process.env.TOKEN!, [
  Intent.Guilds,
  Intent.GuildMessages,
  Intent.GuildVoiceStates,
]);

// extend defaults
const bot = new Bot(process.env.TOKEN!, [
  ...Bot.DEFAULT_INTENTS,
  Intent.GuildVoiceStates,
]);
```

> Some intents like `MessageContent` and `GuildMembers` are privileged and must be enabled in the [Discord Developer Portal](https://discord.com/developers).

---

## How it works

cord connects directly to the [Discord Gateway](https://discord.com/developers/docs/topics/gateway) via WebSocket and manages the full lifecycle:

```
connect → HELLO → IDENTIFY → READY → register commands → listen for events
```

The heartbeat is handled automatically — your bot stays connected.

---

## License

MIT