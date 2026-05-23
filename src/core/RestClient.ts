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

    async replyInteraction(id: string, token: string, content: string): Promise<void> {
        await this.post(`/interactions/${id}/${token}/callback`, {
            type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
            data: {
                content
            }
        });
    }

    async registerCommands(clientId: string, commands: unknown[], guildId?: string): Promise<void> {
        const endpoint = guildId 
        ? `/applications/${clientId}/guilds/${guildId}/commands` 
        : `/applications/${clientId}/commands`;

        await this.put(endpoint, commands);
    }
}