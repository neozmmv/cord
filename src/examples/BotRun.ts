import Bot from "../core/Bot";

const bot = new Bot(process.env.TOKEN!)

bot.addCommand("ping", "Replies with Pong!", async (ctx) => {
    ctx.commandName
    await ctx.sendMessage("PONG!");
})
.addCommand("getdate", "Gets current date and time", async (ctx) => {
    const now = new Date();
    await ctx.sendMessage(`Current date and time: ${now.toISOString()}`);
}, process.env.SERVER_ID)
await bot.run();

console.log("bot info:", bot.user)