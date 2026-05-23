import type { BotUser, CommandHandler } from "./types";

export default class Bot {
    private token: string;
    private guild_id: string;
    private client_id: string;
    public user: BotUser | null = null;
    private commands: Map<string, CommandHandler> = new Map();

    constructor(token: string, guild_id?: string, client_id?: string) {
        this.token = token;
        this.guild_id = guild_id || '';
        this.client_id = client_id || '';
    }

    addCommand(name: string, handler: CommandHandler) {
        this.commands.set(name, handler);
        return this;
    }



    run() {}
}