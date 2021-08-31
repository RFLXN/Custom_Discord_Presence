const {ipcRenderer} = require("electron");

// methods that take data from input form
const values = {
    discordApplicationId: () => document.getElementById("discord-application-id").value,
    presenceState: () => document.getElementById("state").value,
    presenceDetails: () => document.getElementById("details").value,
    presenceStartTime: () => document.getElementById("start-time").value,
    presenceEndTime: () => document.getElementById("end-time").value,
    presenceLargeImageKey: () => document.getElementById("large-image-key").value,
    presenceLargeImageText: () => document.getElementById("large-image-text").value,
    presenceSmallImageKey: () => document.getElementById("small-image-key").value,
    presenceSmallImageText: () => document.getElementById("small-image-text").value,
    presenceButtons: () => {
        const buttonForms = document.getElementsByClassName("button");

        const buttons = [];

        for (const buttonForm of buttonForms) {
            const button = {};
            for (const child of buttonForm.children) {
                // when label container
                if (child.id.match(/button-label-container-[0-9]+/)) {
                    button.label = child.lastChild.value;
                }

                // when url element
                if (child.id.match(/button-url-container-[0-9]+/)) {
                    button.url = child.lastChild.value;
                }
            }
            buttons.push(button);
        }

        return buttons;
    }
}

// apply processes
function apply() {
    const data = {};

    if (values.discordApplicationId() === undefined || values.discordApplicationId() === "") {
        throw new Error("Discord Application Must be Provided");
    }

    data.discordApplicationId = values.discordApplicationId();
    data.presenceState = values.presenceState();
    data.presenceDetails = values.presenceDetails();
    data.presenceStartTime = values.presenceStartTime();
    data.presenceEndTime = values.presenceEndTime();
    data.presenceLargeImageKey = values.presenceLargeImageKey();
    data.presenceLargeImageText = values.presenceLargeImageText();
    data.presenceSmallImageKey = values.presenceSmallImageKey();
    data.presenceSmallImageText = values.presenceSmallImageText();
    data.presenceButtons = values.presenceButtons();

    ipcRenderer.send("request-apply", data);
}

document.getElementById("apply").onclick = (ev => {
    ev.preventDefault();
    try {
        apply();
        removeErrMsg();
    } catch (e) {
        removeErrMsg();
        setMessage(createErrElement(e.message));
    }
});

function createErrElement(msg) {
    const elem = document.createElement("p");
    elem.innerText = msg;
    elem.className = "fw-bold fs-5 text-danger";

    return elem;
}

function createMsgElement(msg) {
    const elem = document.createElement("p");
    elem.innerText = msg;
    elem.className = "fw-bold fs-5 text-success";

    return elem;
}

ipcRenderer.on("error-apply", (event, args) => {
    removeErrMsg();
    setMessage(createErrElement(args.message));
});
ipcRenderer.on("response-apply", (event, args) => {
    removeErrMsg();
    setMessage(createMsgElement(args));
});

function removeErrMsg() {
    try {
        document.getElementById("message-element").remove();
    } catch {
    }
}

function setMessage(msgElem) {
    const msgZone = document.getElementById("msg-zone");

    const elem = msgElem;
    elem.id = "message-element"

    msgZone.appendChild(elem);
}

// initialize data from saved data
document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("request-initial-data");
});
ipcRenderer.on("response-initial-data", (event, args) => {
    if (args === undefined) return;

    if (args.login !== undefined) initializeDiscordFormData(args.login);
    if (args.activity !== undefined) initializePresenceFormData(args.activity);
});

function initializeDiscordFormData(login) {
    if (isEmpty(login.clientId)) return;
    document.getElementById("discord-application-id").value = login.clientId;
}

function initializePresenceFormData(presence) {
    const elemKeys = Object.keys(elemMap);
    elemKeys.forEach(value => {
        if (!isEmpty(presence[value])) {
            document.getElementById(elemMap[value]).value = presence[value];
        }
    });

    if (presence.buttons !== undefined && presence.buttons.length > 0) {
        for (let i in presence.buttons) {
            const btnData = presence.buttons[i];

            addButtonForm();

            document.getElementById(`button-url-${i}`).value = btnData.url;
            document.getElementById(`button-label-${i}`).value = btnData.label;
        }
    }
}

function isEmpty(s) {
    return s === undefined || s.replace(/[ \n]/gi, "") === "";
}

const elemMap = {
    state: "state",
    details: "details",
    startTimestamp: "start-time",
    largeImageKey: "large-image-key",
    largeImageText: "large-image-text",
    smallImageKey: "small-image-key",
    smallImageText: "small-image-text",
}