import Gateway from "./Gateway";
import type { DiscordUser, CommandHandler, Command } from "./types";

export default class Bot {
    private token: string;
    private guild_id: string;
    private client_id: string;
    public user: DiscordUser | null = null;
    private gateway: Gateway | null = null;
    private commands: Map<string, Command> = new Map();

    constructor(token: string, guild_id?: string, client_id?: string) {
        this.token = token;
        this.guild_id = guild_id || '';
        this.client_id = client_id || '';
    }

    addCommand(name: string, description: string, handler: CommandHandler, guildId?: string) {
        this.commands.set(name, { name, description, handler, guildId });
        return this;
    }
    
    async run(): Promise<void> {
        return new Promise((resolve) => {
            this.gateway = new Gateway(this.token, (user) => {
            this.user = user;
            resolve();
        });
            this.gateway.connect();
        })
    }
}