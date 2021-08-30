const {ipcRenderer} = require("electron");

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
                    button.label = child.lastChild.nodeValue;
                }

                // when url element
                if (child.id.match(/button-url-container-[0-9]+/)) {
                    button.url = child.lastChild.nodeValue;
                }
            }
            buttons.push(button);
        }

        return buttons;
    }
}

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

function createMegElement(msg) {
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
    setMessage(createMegElement(args));
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