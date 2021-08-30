import {RawData} from "./front-type";
import {ActivityOptionBuilder, ButtonBuilder, LoginOptionBuilder} from "./discord/option-builders";
import Discord from "./discord/discord";
import {Button} from "./discord/types";
import {IpcMainEvent} from "electron";

const handler = async (event: IpcMainEvent, args: any) => {
    const data = args as RawData;

    const loginOption = new LoginOptionBuilder();

    loginOption.setClientId(data.discordApplicationId);

    try {
        await Discord.instance.login(loginOption.toLoginOption());

        const presenceOption = new ActivityOptionBuilder();

        if (data.presenceDetails != undefined && data.presenceDetails != "") {
            presenceOption.setDetails(data.presenceDetails);
        }

        if (data.presenceState != undefined && data.presenceState != "") {
            presenceOption.setState(data.presenceState);
        }

        if (data.presenceStartTime != undefined && data.presenceStartTime != "") {
            const date = new Date(data.presenceStartTime);
            console.log(date);
            presenceOption.setStartTimestamp(date);
        }

        if (data.presenceEndTime != undefined && data.presenceEndTime != "") {
            const date = new Date(data.presenceEndTime);
            console.log(date);
            presenceOption.setEndTimestamp(date);
        }

        if (data.presenceLargeImageKey != undefined && data.presenceLargeImageKey != "") {
            presenceOption.setLargeImageKey(data.presenceLargeImageKey);
        }

        if (data.presenceLargeImageText != undefined && data.presenceLargeImageText != "") {
            presenceOption.setLargeImageText(data.presenceLargeImageText);
        }

        if (data.presenceSmallImageKey != undefined && data.presenceSmallImageKey != "") {
            presenceOption.setSmallImageKey(data.presenceSmallImageKey);
        }

        if (data.presenceSmallImageText != undefined && data.presenceSmallImageText != "") {
            presenceOption.setSmallImageText(data.presenceSmallImageText);
        }

        if (data.presenceButtons != undefined && data.presenceButtons.length > 0) {
            const buttons: Array<Button> = [];

            for (const button of data.presenceButtons) {
                if (button.url == undefined || button.url == ""
                    || button.label == undefined || button.label == "") {
                    throw new Error("Button Label and URL Must be Filled!");
                }

                const typedButton = new ButtonBuilder();
                typedButton.setLabel(button.label);
                typedButton.setUrl(button.url);

                buttons.push(typedButton.toButton());
            }

            presenceOption.setButtons(buttons);
        }

        await Discord.instance.setActivity(presenceOption.toActivityOption());

        event.reply("response-apply", "Presence Applied!");
    } catch (e) {
        event.reply("error-apply", e);
    }
}

export default handler;