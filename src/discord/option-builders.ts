import {ActivityOption, Button, LoginOption} from "./types";

export class LoginOptionBuilder {
    private option: EmptyLoginOption;

    public constructor() {
        this.option = {};
    }

    public setClientId(id: string): LoginOptionBuilder {
        this.option.clientId = id;
        return this;
    }

    public setClientSecret(secret: string): LoginOptionBuilder {
        this.option.clientSecret = secret;
        return this;
    }

    public setAccessToken(token: string): LoginOptionBuilder {
        this.option.accessToken = token;
        return this;
    }

    public setRpcToken(token: string): LoginOptionBuilder {
        this.option.rpcToken = token;
        return this;
    }

    public setRedirectUri(uri: string): LoginOptionBuilder {
        this.option.redirectUri = uri;
        return this;
    }

    public setScopes(scopes: string[]): LoginOptionBuilder {
        this.option.scopes = scopes;
        return this;
    }

    public setPrompt(prompt: "none" | "consent"): LoginOptionBuilder {
        this.option.prompt = prompt;
        return this;
    }

    public toLoginOption(): LoginOption {
        if (this.option.clientId == undefined) throw new Error("clientId is empty!");
        return this.option as LoginOption;
    }
}

interface EmptyLoginOption {
    clientId?: string;
    clientSecret?: string | undefined;
    accessToken?: string | undefined;
    rpcToken?: string | undefined;
    redirectUri?: string | undefined;
    scopes?: string[] | undefined;
    prompt?: 'none' | 'consent' | undefined;
}

export class ActivityOptionBuilder {
    private option: ActivityOption;

    constructor() {
        this.option = {};
    }

    public setState(state: string): ActivityOptionBuilder {
        this.option.state = state;
        return this;
    }

    public setDetails(details: string): ActivityOptionBuilder {
        this.option.details = details;
        return this;
    }

    public setStartTimestamp(timestamp: number | Date): ActivityOptionBuilder {
        this.option.startTimestamp = timestamp;
        return this;
    }

    public setEndTimestamp(timestamp: number | Date): ActivityOptionBuilder {
        this.option.endTimestamp = timestamp;
        return this;
    }

    public setLargeImageKey(key: string): ActivityOptionBuilder {
        this.option.largeImageKey = key;
        return this;
    }

    public setLargeImageText(text: string): ActivityOptionBuilder {
        this.option.largeImageText = text;
        return this;
    }

    public setSmallImageKey(key: string): ActivityOptionBuilder {
        this.option.smallImageKey = key;
        return this;
    }

    public setSmallImageText(text: string): ActivityOptionBuilder {
        this.option.smallImageText = text;
        return this;
    }

    public setButtons(buttons: Array<Button>): ActivityOptionBuilder {
        this.option.buttons = buttons;
        return this;
    }

    public toActivityOption(): ActivityOption {
        return this.option;
    }
}

export class ButtonBuilder {
    private button: EmptyButton;

    constructor() {
        this.button = {};
    }

    public setLabel(label: string): ButtonBuilder {
        this.button.label = label;
        return this;
    }

    public setUrl(url: string): ButtonBuilder {
        this.button.url = url;
        return this;
    }

    public toButton(): Button {
        if (this.button.url == undefined) throw new Error("url is empty!");
        if (this.button.label == undefined) throw new Error("label is Empty!");

        return this.button as Button;
    }
}

interface EmptyButton {
    label?: string | undefined;
    url?: string | undefined;
}