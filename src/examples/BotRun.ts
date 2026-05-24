import Bot from "../core/Bot";

const bot = new Bot(process.env.TOKEN!)

bot.addCommand("ping", "Replies with Pong!", async (ctx) => {
    await ctx.reply("PONG!");
})
await bot.run();

console.log("bot info:", bot.user)