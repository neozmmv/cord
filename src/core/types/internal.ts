import type { GuildUser, Channel } from './public';

export interface GatewayResponse {
  readonly t: string | null;
  readonly s: number | null;
  readonly op: number;
  readonly d: unknown;
}

export interface HelloPayload {
  readonly heartbeat_interval: number;
  readonly _trace: string[];
}

export interface ReadyPayload {
  readonly v: number;
  readonly user_settings: {};
  readonly user: DiscordUser;
  readonly application: {
    readonly id: string;
    readonly flags: number;
  };
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

export interface Member {
  readonly user: GuildUser;
  readonly roles: string[];
  readonly nick: string | null;
  readonly permissions: string;
  readonly joined_at: string;
}