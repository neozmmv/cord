import type { InteractionPayload } from "./types/internal";
import type { Channel, Context, GuildUser, MessageOptions } from "./types/public";
import RestClient from "./RestClient";

export default class InteractionContext implements Context {
    user: GuildUser;
    channel: Channel;
    commandName: string;
    guildId: string;
    locale: string;

        constructor(
            private interaction: InteractionPayload,
            private rest: RestClient
        ) {
        this.commandName = interaction.data.name;
        this.user = interaction.member.user;
        this.locale = interaction.locale;
        this.guildId = interaction.guild_id;
        this.channel = interaction.channel;
    }

    async sendMessage(content: string, options?: MessageOptions): Promise<void> {
        await this.rest.replyInteraction(this.interaction.id, this.interaction.token, content, options);
    }

    async editMessage(content: string): Promise<void> {
        await this.rest.editInteractionReply(this.interaction.token, this.interaction.application_id, content);
    }
}