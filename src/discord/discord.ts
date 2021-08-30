import {Client} from "discord-rpc";
import {ActivityOption, LoginOption} from "./types";

export default class Discord {
    private client: Client;

    constructor() {
        this.client = new Client({transport: "ipc"});
    }

    // singleton
    private static _instance: Discord = new Discord();

    public static get instance() {
        return this._instance;
    }

    public async login(option: LoginOption): Promise<void> {
        await this.client.login(option);
    }

    public async destroy(): Promise<void> {
        await this.client.destroy();
    }

    public async setActivity(option: ActivityOption): Promise<void> {
        await this.client.setActivity(option);
    }
}

