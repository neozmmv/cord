import Gateway from "./Gateway";
import type { DiscordUser, CommandHandler } from "./types";

export default class Bot {
    private token: string;
    private guild_id: string;
    private client_id: string;
    public user: DiscordUser | null = null;
    private gateway: Gateway | null = null;
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