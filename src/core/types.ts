

export interface Context {
    commandName: string;
    reply: (content: string) => Promise<void>;
}

export type CommandHandler = (ctx: Context) => Promise<void>;

export interface GatewayResponse {
    t: string | null;
    s: number | null;
    op: number;
    d: unknown;
}

// this is the "d" property of the payload sent on op 10 (HELLO)
export interface HelloPayload {
    heartbeat_interval: number;
    _trace: string[];
}

// this is the "d" property of the payload sent on op 0 (DISPATCH) with t: "READY"
export interface ReadyPayload {
    v: number;
    user_settings: {};
    user: DiscordUser;
}

export interface DiscordUser {
    verified: boolean;
    username: string;
    primary_guild: string | null;
    mfa_enabled: boolean;
    id: string;
    global_name: string | null;
    flags: number;
    email: string | null;
    discriminator: string;
    clan: string | null;
    bot: boolean;
    avatar: string | null;
}

export interface Command {
  name: string;
  description: string;
  handler: CommandHandler;
  guildId?: string;
}