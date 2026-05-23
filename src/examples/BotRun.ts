import Bot from "../core/Bot";

const bot = new Bot(process.env.TOKEN!)
await bot.run();

console.log("bot info:", bot.user)