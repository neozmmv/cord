import RestClient from "./RestClient";
import type { DiscordUser, GatewayResponse, HelloPayload, ReadyPayload, InteractionPayload } from "./types/internal";
import type { Command } from "./types/public";
import InteractionContext from "./InteractionContext";

export default class Gateway {
    private ws!: WebSocket;
    private sequence: number | null = null;
    private heartbeatInterval!: Timer;

    constructor(
        private token: string,
        private onReady: (user: DiscordUser, clientId: string) => void,
        private commands: Map<string, Command>,
        private rest: RestClient
    ) {}

    connect() {
        this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

        this.ws.onopen = () => {
            console.log("Connected to Discord Gateway");
        }

        this.ws.onmessage = (event) => {
            console.log(event.data)
            const data = JSON.parse(event.data) as GatewayResponse;
            this.handlePayload(data);
        }

        this.ws.onclose = (event) => {
            console.log(`WebSocket closed: ${event.code} - ${event.reason}`);
            clearInterval(this.heartbeatInterval);
        }

        this.ws.onerror = (error) => {
            console.error("Gateway WebSocket error:", error);
        }
    }

    private handlePayload(payload: GatewayResponse) {
        if(payload.s) this.sequence = payload.s
        // Handle incoming payloads from the gateway
        // Discord sends HELLO and we send IDENTIFY, start the heartbeat, etc.

        switch (payload.op) {
            case 10: // HELLO
            this.heartbeatInterval = setInterval(()=> {
                // sends info to keep the bot alive at every interval
                const heartbeatPayload = {
                    op: 1,
                    d: this.sequence
                }
                this.ws.send(JSON.stringify(heartbeatPayload));
            }, (payload.d as HelloPayload).heartbeat_interval);
            this.sendIdentify();
            break;

            case 11: // HEARTBEAT_ACK
            // check if the bot is alive, but we'll just log it for now
            console.log("Received HEARTBEAT_ACK");
            break;

            case 0: // DISPATCH
            // this is where we receive events !! IMPORTANT!!
            //console.log("Received DISPATCH event:", payload.t);
                this.handleEvent(payload.t, payload.d);
            break;
        }
    }

    private async handleEvent(event: string | null, data?: unknown) {
        switch(event) {
            case "READY":
                const ready = data as ReadyPayload;
                console.log(`Logged in as ${ready.user.username}`);
                this.onReady(ready.user, ready.application.id);
                break;
            case "INTERACTION_CREATE":
                const interaction = data as InteractionPayload;
                const command = this.commands.get(interaction.data.name);
                if (!command) return;
                const ctx = new InteractionContext(interaction, this.rest);
                await command.handler(ctx);
                break;
        }
    }

    private sendIdentify() {
        const identifyPayload = {
            "op": 2,
            "d": {
                "token": this.token,
                "intents": 513, // we'll do this later, i dont know this yet
                "properties": {
                    "os": "linux",
                    "browser": "cord",
                    "device": "cord"
                }
            }
        }
        this.ws.send(JSON.stringify(identifyPayload));
    }
}