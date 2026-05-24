export interface Context {
  readonly commandName: string;
  readonly user: GuildUser;
  readonly channel: Channel;
  readonly locale: string;
  sendMessage: (content: string) => Promise<void>;
}

export type CommandHandler = (ctx: Context) => Promise<void>;

export interface GuildUser {
  readonly username: string;
  readonly public_flags: number;
  readonly primary_guild: Clan | null;
  readonly id: string;
  readonly global_name: string;
  readonly display_name_styles: any[] | null;
  readonly discriminator: string;
  readonly collectibles: any[] | null;
  readonly clan: Clan | null;
  readonly avatar_decoration_data: any | null;
  readonly avatar: string | null;
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
  readonly flags: number;
}

export interface Clan {
  readonly tag: string;
  readonly identity_guild_id: string;
  readonly identity_enabled: boolean;
  readonly badge: string;
}

export interface Command {
  readonly name: string;
  readonly description: string;
  readonly handler: CommandHandler;
  readonly guildId?: string;
}