import type { Context, InteractionPayload } from "./types";
import RestClient from "./RestClient";

export default class InteractionContext implements Context {
    commandName: string;

    constructor(
    private interaction: InteractionPayload,
    private rest: RestClient
  ) {
    this.commandName = interaction.data.name;
  }

    async reply(content: string): Promise<void> {
        await this.rest.replyInteraction(this.interaction.id, this.interaction.token, content);
    }
}