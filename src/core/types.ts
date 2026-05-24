export interface Context {
    commandName: string;
    user: GuildUser;
    channel: Channel;
    locale: string;
    sendMessage: (content: string) => Promise<void>;
}

export type CommandHandler = (ctx: Context) => Promise<void>;

export interface GatewayResponse {
    t: string | null;
    s: number | null;
    op: number;
    d: unknown;
}

export interface Channel {
    type: number;
    topic: string | null;
    rate_limit_per_user: number;
    position: number;
    permissions: string;
    parent_id: string | null;
    nsfw: boolean;
    name: string;
    last_message_id: string | null;
    id: string;
    guild_id: string;
    flags: number
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
    application: {
        id: string;
        flags: number;
    }
}

export interface GuildUser {
    username: string;
    public_flags: number;
    primary_guild: Clan | null;
    id: string;
    global_name: string;
    display_name_styles: any[] | null;
    discriminator: string;
    collectibles : any[] | null;
    clan: Clan | null;
    avatar_decoration_data : any | null;
    avatar: string | null;
}

export interface Member {
    user: GuildUser;
    roles: string[];
    nick: string | null;
    permissions: string;
    joined_at: string;
}

export interface Clan {
    tag: string;
    identity_guild_id: string;
    identity_enabled: boolean;
    badge: string;
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

// 'd' property of payload on .t == "INTERACTION_CREATE"
export interface InteractionPayload {
    id: string;
    token: string;
    type: number;
    guild_id: string;
    channel_id: string;
    locale: string;
    member: Member;
    data: {
        name: string;
        type: number;
        id: string;
    };
    channel: Channel;
}

export interface Command {
    name: string;
    description: string;
    handler: CommandHandler;
    guildId?: string;
}