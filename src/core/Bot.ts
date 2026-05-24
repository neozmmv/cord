import Gateway from "./Gateway";
import RestClient from "./RestClient";
import type { CommandHandler, Command } from "./types/public";
import type { DiscordUser } from "./types/internal";

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
        for(let i = 0; i < name.length; i++) {
            let letter = name.charAt(i);
            if(!/[a-z0-9]/.test(letter)) {
                throw new Error("Command names must be lowercase and can only contain letters and numbers");
            }
        }
        this.commands.set(name, { name, description, handler, guildId });
        return this;
    }
    
    async run(): Promise<void> {
        return new Promise((resolve) => {
            const rest = new RestClient(this.token);
            this.gateway = new Gateway(this.token, async (user, clientId) => {
            this.user = user;
            const globalCommands = [...this.commands.values().filter(cmd => !cmd.guildId)]
            const guildCommands = [...this.commands.values().filter(cmd => cmd.guildId)]

            if (globalCommands.length > 0) {
                await rest.registerCommands(clientId, globalCommands.map(cmd => ({
                name: cmd.name,
                description: cmd.description
            })));
           }

            const byGuild = new Map<string, typeof guildCommands>();
            for (const cmd of guildCommands) {
                const existing = byGuild.get(cmd.guildId!) ?? [];
                byGuild.set(cmd.guildId!, [...existing, cmd]);
            }

            for (const [guildId, cmds] of byGuild) {
                await rest.registerCommands(clientId, cmds.map(cmd => ({
                    name: cmd.name,
                    description: cmd.description
                })), guildId);
            }

            resolve();  
        }, this.commands, rest);
            this.gateway.connect();
        })
    }
}