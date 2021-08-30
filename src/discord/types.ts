import {Presence, RPCLoginOptions} from "discord-rpc";

export type LoginOption = RPCLoginOptions;

export type ActivityOption = Presence;

export interface Button {
    label: string;
    url: string;
}