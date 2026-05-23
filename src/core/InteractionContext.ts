import type { Context } from "./types";

class InteractionContext implements Context {
    commandName: string;

    constructor(commandName: string) {
        this.commandName = commandName;
    }

    async reply(content: string): Promise<void> {
        //
    }
}