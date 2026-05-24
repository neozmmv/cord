import Bot from "../core/Bot";
import InteractionContext from "../core/InteractionContext";
import { Event } from "../core/types/public";

const bot = new Bot(process.env.TOKEN!, Bot.DEFAULT_INTENTS)

bot.addCommand("ping", "Replies with Pong!", async (ctx) => {
    ctx.commandName
    await ctx.sendMessage("PONG!");
})
.addCommand("getdate", "Gets current date and time", async (ctx) => {
    const now = new Date();
    await ctx.sendMessage(`Current date and time: ${now.toISOString()}`);
}, process.env.SERVER_ID)
.addCommand("whoami", "Replies with your username", async (ctx) => {
    const senderUsername = ctx.user.global_name;
    await ctx.sendMessage(`You are ${senderUsername}`);
}, process.env.SERVER_ID)
.addCommand("serverinfo", "Replies with server info", async (ctx) => {
    const server = ctx.channel.id;
    const channel = ctx.channel.name || "Unknown Channel";
    await ctx.sendMessage(`You are in server with ID: ${server} and channel: ${channel}`);
}, process.env.SERVER_ID)


bot.on(Event.MESSAGE_CREATE, async (ctx) => {
    if (ctx.content === "!hello") {
        await ctx.sendMessage("Hello there!");
    }
})

await bot.run();
/* 
console.log("bot info:", bot.user) */