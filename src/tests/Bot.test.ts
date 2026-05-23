import { describe, it, expect } from "bun:test";
import Bot from "../core/Bot"
import Gateway from "../core/Gateway"

describe("Bot", () => {
    it("should create a new bot instance", () => {
        const bot = new Bot("test_token");
        bot.addCommand("ping", async(ctx) => {
            await ctx.reply("pong")
        });
        expect(bot).toBeInstanceOf(Bot);
    })
})

describe("Gateway", () => {
    it("should create and test a gateway instance", () => {
        const gateway = new Gateway("test_token");
        gateway.connect();
        expect(gateway).toBeInstanceOf(Gateway);
    })
}) 