import type { GatewayChannelUpdateDispatchData, GatewayChannelCreateDispatchData, GatewayMessageCreateDispatch, GatewayReadyDispatch, GatewayReadyDispatchData, GatewayResumedDispatch, GatewayChannelDeleteDispatchData, GatewayChannelPinsUpdateDispatchData, GatewayGuildCreateDispatchData, GatewayGuildUpdateDispatchData, GatewayGuildDeleteDispatchData, GatewayGuildBanAddDispatchData, GatewayGuildBanRemoveDispatchData, GatewayGuildEmojisUpdateDispatchData, GatewayGuildMemberAddDispatchData, GatewayGuildMemberUpdateDispatchData, GatewayGuildMemberRemoveDispatchData, GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData, GatewayMessageDeleteDispatchData, GatewayMessageDeleteBulkDispatchData, GatewayMessageReactionAddDispatchData, GatewayMessageReactionRemoveDispatchData, GatewayMessageReactionRemoveAllDispatchData, GatewayPresenceUpdateDispatchData, GatewayTypingStartDispatchData, GatewayVoiceStateUpdateDispatchData, GatewayVoiceServerUpdateDispatchData, GatewayInteractionCreateDispatchData, GatewayThreadCreateDispatchData, GatewayThreadUpdateDispatchData, GatewayThreadDeleteDispatchData, GatewayThreadMemberUpdateDispatchData, GatewayGuildStickersUpdateDispatchData } from "discord-api-types/v10"
import type MessageContext from "../MessageContext";

export interface Context {
    readonly commandName: string;
    readonly user: GuildUser;
    readonly channel: Channel;
    readonly locale: string;
    sendMessage: (content: string, options?: MessageOptions) => Promise<void>;
}

export interface MessageOptions {
    ephemeral?: boolean;
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

export enum Event {
    READY = "READY",
    RESUMED = "RESUMED",

    CHANNEL_CREATE = "CHANNEL_CREATE",
    CHANNEL_UPDATE = "CHANNEL_UPDATE",
    CHANNEL_DELETE = "CHANNEL_DELETE",
    CHANNEL_PINS_UPDATE = "CHANNEL_PINS_UPDATE",

    GUILD_CREATE = "GUILD_CREATE",
    GUILD_UPDATE = "GUILD_UPDATE",
    GUILD_DELETE = "GUILD_DELETE",
    GUILD_BAN_ADD = "GUILD_BAN_ADD",
    GUILD_BAN_REMOVE = "GUILD_BAN_REMOVE",
    GUILD_EMOJIS_UPDATE = "GUILD_EMOJIS_UPDATE",
    GUILD_STICKERS_UPDATE = "GUILD_STICKERS_UPDATE",

    GUILD_MEMBER_ADD = "GUILD_MEMBER_ADD",
    GUILD_MEMBER_UPDATE = "GUILD_MEMBER_UPDATE",
    GUILD_MEMBER_REMOVE = "GUILD_MEMBER_REMOVE",

    MESSAGE_CREATE = "MESSAGE_CREATE",
    MESSAGE_UPDATE = "MESSAGE_UPDATE",
    MESSAGE_DELETE = "MESSAGE_DELETE",
    MESSAGE_DELETE_BULK = "MESSAGE_DELETE_BULK",

    MESSAGE_REACTION_ADD = "MESSAGE_REACTION_ADD",
    MESSAGE_REACTION_REMOVE = "MESSAGE_REACTION_REMOVE",
    MESSAGE_REACTION_REMOVE_ALL = "MESSAGE_REACTION_REMOVE_ALL",

    PRESENCE_UPDATE = "PRESENCE_UPDATE",
    TYPING_START = "TYPING_START",

    VOICE_STATE_UPDATE = "VOICE_STATE_UPDATE",
    VOICE_SERVER_UPDATE = "VOICE_SERVER_UPDATE",

    INTERACTION_CREATE = "INTERACTION_CREATE",

    THREAD_CREATE = "THREAD_CREATE",
    THREAD_UPDATE = "THREAD_UPDATE",
    THREAD_DELETE = "THREAD_DELETE",
    THREAD_MEMBER_UPDATE = "THREAD_MEMBER_UPDATE",
}

export interface EventPayloadMap {
    [Event.READY]: GatewayReadyDispatchData;
    [Event.RESUMED]: GatewayResumedDispatch; // does not have data, accessible via .d

    [Event.CHANNEL_CREATE]: GatewayChannelCreateDispatchData;
    [Event.CHANNEL_UPDATE]: GatewayChannelUpdateDispatchData;
    [Event.CHANNEL_DELETE]: GatewayChannelDeleteDispatchData;
    [Event.CHANNEL_PINS_UPDATE]: GatewayChannelPinsUpdateDispatchData;

    [Event.GUILD_CREATE]: GatewayGuildCreateDispatchData;
    [Event.GUILD_UPDATE]: GatewayGuildUpdateDispatchData;
    [Event.GUILD_DELETE]: GatewayGuildDeleteDispatchData;
    [Event.GUILD_BAN_ADD]: GatewayGuildBanAddDispatchData;
    [Event.GUILD_BAN_REMOVE]: GatewayGuildBanRemoveDispatchData;
    [Event.GUILD_EMOJIS_UPDATE]: GatewayGuildEmojisUpdateDispatchData;
    [Event.GUILD_STICKERS_UPDATE]: GatewayGuildStickersUpdateDispatchData;
    [Event.GUILD_MEMBER_ADD]: GatewayGuildMemberAddDispatchData;
    [Event.GUILD_MEMBER_UPDATE]: GatewayGuildMemberUpdateDispatchData;
    [Event.GUILD_MEMBER_REMOVE]: GatewayGuildMemberRemoveDispatchData;

    [Event.MESSAGE_CREATE]: MessageContext;
    [Event.MESSAGE_UPDATE]: GatewayMessageUpdateDispatchData;
    [Event.MESSAGE_DELETE]: GatewayMessageDeleteDispatchData;
    [Event.MESSAGE_DELETE_BULK]: GatewayMessageDeleteBulkDispatchData;
    [Event.MESSAGE_REACTION_ADD]: GatewayMessageReactionAddDispatchData;
    [Event.MESSAGE_REACTION_REMOVE]: GatewayMessageReactionRemoveDispatchData;
    [Event.MESSAGE_REACTION_REMOVE_ALL]: GatewayMessageReactionRemoveAllDispatchData;

    [Event.PRESENCE_UPDATE]: GatewayPresenceUpdateDispatchData;
    [Event.TYPING_START]: GatewayTypingStartDispatchData;
    
    [Event.VOICE_STATE_UPDATE]: GatewayVoiceStateUpdateDispatchData;
    [Event.VOICE_SERVER_UPDATE]: GatewayVoiceServerUpdateDispatchData;

    [Event.INTERACTION_CREATE]: GatewayInteractionCreateDispatchData;
    [Event.THREAD_CREATE]: GatewayThreadCreateDispatchData;
    [Event.THREAD_UPDATE]: GatewayThreadUpdateDispatchData;
    [Event.THREAD_DELETE]: GatewayThreadDeleteDispatchData;
    [Event.THREAD_MEMBER_UPDATE]: GatewayThreadMemberUpdateDispatchData;
}