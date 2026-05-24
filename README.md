# cord

> ⚠️ **Work in progress.** cord is in early development — APIs may change and not all features are stable yet. Not published to npm.

A minimal Discord bot library built directly on top of the Discord API — no abstractions you didn't ask for.

```ts
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
- **Direct API** — built on raw WebSocket + REST

---

## Installation

cord is not yet published to npm. Clone the repository and import directly:

```bash
git clone https://github.com/neozmmv/cord
cd cord
bun install
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
import Bot from './core/Bot';

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

Command names must be lowercase and can only contain letters, numbers, and hyphens.

### Chaining

```ts
bot
  .addCommand('ping', 'Ping the bot', pingHandler)
  .addCommand('help', 'Show help', helpHandler)
  .addCommand('info', 'Server info', infoHandler);
```

### Handlers as separate functions

```ts
import type { Context } from './core/types';

async function pingHandler(ctx: Context) {
  await ctx.sendMessage(`Pong! Hey ${ctx.user.username}`);
}

bot.addCommand('ping', 'Ping the bot', pingHandler);
```

---

## Context

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
});
```

---

## Project structure (recommended)

```
src/
  commands/
    ping.ts
    info.ts
    help.ts
  bot.ts
.env
```

```ts
// commands/ping.ts
import type { Context } from './core/types';

export async function pingHandler(ctx: Context) {
  await ctx.sendMessage(`Pong! Response time: ${Date.now()}ms`);
}
```

```ts
// bot.ts
import Bot from './core/Bot';
import { pingHandler } from './commands/ping';

const bot = new Bot(process.env.TOKEN!);
bot.addCommand('ping', 'Ping the bot', pingHandler);
await bot.run();
```

---

## How it works

cord connects directly to the [Discord Gateway](https://discord.com/developers/docs/topics/gateway) via WebSocket and manages the full lifecycle:

```
connect → HELLO → IDENTIFY → READY → register commands → listen for interactions
```

When a slash command is used, the `INTERACTION_CREATE` event arrives through the WebSocket. cord finds the matching handler, builds a `Context` object, and calls your function. The reply goes back via the Discord REST API.

The heartbeat is handled automatically — your bot stays connected.