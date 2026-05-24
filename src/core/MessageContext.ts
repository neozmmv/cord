import type { GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import RestClient from "./RestClient";

export default class MessageContext {
    readonly content: string;
    readonly channelId: string;
    readonly guildId: string | null;
    readonly author: GatewayMessageCreateDispatchData["author"];

    constructor(
        private payload: GatewayMessageCreateDispatchData,
        private rest: RestClient
    ) {
        this.content = payload.content;
        this.channelId = payload.channel_id;
        this.guildId = payload.guild_id ?? null;
        this.author = payload.author;
    }

    async sendMessage(content: string): Promise<void> {
        await this.rest.sendMessage(this.channelId, content);
    }
}