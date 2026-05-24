export interface Context {
    readonly commandName: string;
    readonly user: GuildUser;
    readonly channel: Channel;
    readonly locale: string;
    sendMessage: (content: string) => Promise<void>;
}

export type CommandHandler = (ctx: Context) => Promise<void>;

export interface GatewayResponse {
    readonly t: string | null;
    readonly s: number | null;
    readonly op: number;
    readonly d: unknown;
}

export interface Channel {
    readonly type: number;
    readonly topic: string | null;
    readonly rate_limit_per_user: number;
    readonly position: number;
    readonly permissions: string;
    readonly parent_id: string | null;
    readonly nsfw: boolean;
    readonly name: string;
    readonly last_message_id: string | null;
    readonly id: string;
    readonly guild_id: string;
    readonly flags: number
}

// this is the "d" property of the payload sent on op 10 (HELLO)
export interface HelloPayload {
    readonly heartbeat_interval: number;
    readonly _trace: string[];
}

// this is the "d" property of the payload sent on op 0 (DISPATCH) with t: "READY"
export interface ReadyPayload {
    readonly v: number;
    readonly user_settings: {};
    readonly user: DiscordUser;
    readonly application: {
        readonly id: string;
        readonly flags: number;
    }
}

export interface GuildUser {
    readonly username: string;
    readonly public_flags: number;
    readonly primary_guild: Clan | null;
    readonly id: string;
    readonly global_name: string;
    readonly display_name_styles: any[] | null;
    readonly discriminator: string;
    readonly collectibles : any[] | null;
    readonly clan: Clan | null;
    readonly avatar_decoration_data : any | null;
    readonly avatar: string | null;
}

export interface Member {
    readonly user: GuildUser;
    readonly roles: string[];
    readonly nick: string | null;
    readonly permissions: string;
    readonly joined_at: string;
}

export interface Clan {
    readonly tag: string;
    readonly identity_guild_id: string;
    readonly identity_enabled: boolean;
    readonly badge: string;
}

export interface DiscordUser {
    readonly verified: boolean;
    readonly username: string;
    readonly primary_guild: string | null;
    readonly mfa_enabled: boolean;
    readonly id: string;
    readonly global_name: string | null;
    readonly flags: number;
    readonly email: string | null;
    readonly discriminator: string;
    readonly clan: string | null;
    readonly bot: boolean;
    readonly avatar: string | null;
}

// 'd' property of payload on .t == "INTERACTION_CREATE"
export interface InteractionPayload {
    readonly id: string;
    readonly token: string;
    readonly type: number;
    readonly guild_id: string;
    readonly channel_id: string;
    readonly locale: string;
    readonly member: Member;
    readonly data: {
        readonly name: string;
        readonly type: number;
        readonly id: string;
    };
    readonly channel: Channel;
}

export interface Command {
    readonly name: string;
    readonly description: string;
    readonly handler: CommandHandler;
    readonly guildId?: string;
}