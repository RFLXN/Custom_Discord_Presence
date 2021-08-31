import {ActivityOption, LoginOption} from "./discord/types";
import {promises as fs} from "fs";
import * as path from "path";

export async function saveData(loginOption: LoginOption, activityOption: ActivityOption) {
    const data = {
        login: loginOption,
        activity: activityOption
    };

    const str = JSON.stringify(data);

    await fs.writeFile(path.join(__dirname, "../saved.data"), str, {encoding: "utf8"});
}

export async function loadData(): Promise<LocalData> {
    try {
        const rawData = await fs.readFile(path.join(__dirname, "../saved.data"));

        if (rawData == undefined || rawData.toString() == undefined
            || rawData.toString().replace(/[ \n]/gi, "") == "") throw new Error();

        const data = JSON.parse(rawData.toString()) as LocalData;

        if (data == undefined) throw new Error();

        return data;
    } catch (e) {
        return {login: undefined, activity: undefined};
    }
}

export interface LocalData {
    login?: LoginOption | undefined;
    activity?: ActivityOption | undefined;
}