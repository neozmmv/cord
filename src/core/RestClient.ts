import type { MessageOptions } from "./types/public";

export default class RestClient {
    private baseURL = "https://discord.com/api/v10";

    constructor(private token: string) {}

    async put(endpoint: string, body: unknown): Promise<unknown> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bot ${this.token}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Discord HTTP error! status: ${response.status} - ${response.statusText} - ${errorBody}`);
        }
        return response.json();
    }

        async patch(endpoint: string, body: unknown): Promise<unknown> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bot ${this.token}`
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`Discord HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    }

    async post(endpoint: string, body: unknown): Promise<unknown> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bot ${this.token}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Discord HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    }

    async replyInteraction(id: string, token: string, content: string, options?: MessageOptions): Promise<void> {
        await this.post(`/interactions/${id}/${token}/callback`, {
            type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
            data: {
                content,
                flags: options?.ephemeral ? 64 : 0
            }
        });
    }

    async sendMessage(channelId: string, content: string): Promise<string> {
        const response = await this.post(`/channels/${channelId}/messages`, { content });
        return (response as any).id;
    }

    async editMessage(channelId: string, messageId: string, content: string): Promise<void> {
        await this.patch(`/channels/${channelId}/messages/${messageId}`, { content });
    }

    async editInteractionReply(token: string, clientId: string, content: string): Promise<void> {
        await this.patch(`/webhooks/${clientId}/${token}/messages/@original`, { content });
    }

    async registerCommands(clientId: string, commands: unknown[], guildId?: string): Promise<void> {
        const endpoint = guildId 
        ? `/applications/${clientId}/guilds/${guildId}/commands` 
        : `/applications/${clientId}/commands`;

        await this.put(endpoint, commands);
    }
}