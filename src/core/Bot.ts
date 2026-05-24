import Gateway from "./Gateway";
import RestClient from "./RestClient";
import type { CommandHandler, Command, Event, EventPayloadMap } from "./types/public";
import { GatewayIntentBits } from "discord-api-types/v10";
import type { DiscordUser } from "./types/internal";

export default class Bot {
    private token: string;
    private guild_id: string;
    private client_id: string;
    public user: DiscordUser | null = null;
    private gateway: Gateway | null = null;
    private commands: Map<string, Command> = new Map();
    private listeners: Map<Event, ((ctx: unknown) => void)[]> = new Map();
    private intents: number;

    static DEFAULT_INTENTS = [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]

    constructor(token: string, intents: GatewayIntentBits[] = Bot.DEFAULT_INTENTS, guild_id?: string, client_id?: string,) {
        this.token = token;
        this.guild_id = guild_id || '';
        this.client_id = client_id || '';
        this.intents = intents.reduce((acc, intent) => acc | intent, 0);
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

    on<E extends Event>(event: E, handler: (ctx: EventPayloadMap[E]) => void) {
        //just registers events on the map, events will run on dispatch
        if(!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(handler as (ctx: unknown) => void);
        return this;
    }

    private dispatch<E extends Event>(event: E, payload: EventPayloadMap[E]): void {
        // calls the handlers registered to an event
        const handlers = this.listeners.get(event) ?? [];
        for (const handler of handlers) {
            handler(payload);
        }
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
        }, this.commands, rest, this.dispatch.bind(this), this.intents);
            this.gateway.connect();
        })
    }
}