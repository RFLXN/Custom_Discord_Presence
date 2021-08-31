let buttonNum = 0;

function editNum(deletedNum) {
    const buttonContainers = document.getElementsByClassName("button");

    for (const buttonContainer of buttonContainers) {
        const buttonId = Number(buttonContainer.id.split("-")[2]);

        if (buttonId < deletedNum) continue;
        buttonContainer.id = `button-container-${buttonId - 1}`;
        for (const child of buttonContainer.children) {
            // when button name element
            if (child.tagName.toLowerCase() === "h6") {
                child.innerText = `Button ${buttonId}`;
            }

            // when label container
            if (child.id.match(/button-label-container-[0-9]+/)) {
                child.id = `button-label-container-${buttonId - 1}`;
                child.lastChild.id = `button-label-${buttonId - 1}`;
            }

            // when url element
            if (child.id.match(/button-url-container-[0-9]+/)) {
                child.id = `button-url-container-${buttonId - 1}`;
                child.lastChild.id = `button-url-${buttonId - 1}`;
            }

            // when delete button element
            if (child.id.match(/delete-button-[0-9]+/)) {
                child.id = `delete-button-${buttonId - 1}`;
                child.firstChild.id = `delete-x-${buttonId - 1}`;
            }
        }
    }
}

function createButtonForm() {
    const elements = {
        buttonNameElement: () => {
            const buttonName = document.createElement("h6");
            buttonName.className = "text-center";
            buttonName.style = "padding-top: 0.5em";
            buttonName.innerText = `Button ${buttonNum + 1}`;

            return buttonName;
        },
        labelElement: () => {
            const buttonLabelContainer = document.createElement("div");
            buttonLabelContainer.className = "input-group text-center";
            buttonLabelContainer.style = "padding-bottom: 0.25em";
            buttonLabelContainer.id = `button-label-container-${buttonNum}`;

            const buttonLabelSpan = document.createElement("span");
            buttonLabelSpan.className = "input-group-text col-3";
            buttonLabelSpan.innerText = "Label";

            const buttonLabelInput = document.createElement("input");
            buttonLabelInput.type = "text";
            buttonLabelInput.className = "form-control";
            buttonLabelInput.id = `button-label-${buttonNum}`;

            buttonLabelContainer.appendChild(buttonLabelSpan);
            buttonLabelContainer.appendChild(buttonLabelInput);

            return buttonLabelContainer;
        },
        urlElement: () => {
            const buttonUrlContainer = document.createElement("div");
            buttonUrlContainer.className = "input-group text-center";
            buttonUrlContainer.style = "padding-bottom: 0.25em";
            buttonUrlContainer.id = `button-url-container-${buttonNum}`;

            const buttonUrlSpan = document.createElement("span");
            buttonUrlSpan.className = "input-group-text col-3";
            buttonUrlSpan.innerText = "URL";

            const buttonUrlInput = document.createElement("input");
            buttonUrlInput.type = "text";
            buttonUrlInput.className = "form-control";
            buttonUrlInput.id = `button-url-${buttonNum}`;

            buttonUrlContainer.appendChild(buttonUrlSpan);
            buttonUrlContainer.appendChild(buttonUrlInput);

            return buttonUrlContainer;
        },
        deleteButton: () => {
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn btn-danger col-12 button-delete-button";
            deleteButton.innerHTML = `<i class="bi-x" id="delete-x-${buttonNum}"></i>`;
            deleteButton.id = `delete-button-${buttonNum}`;
            deleteButton.onclick = (event) => {
                const id = event.target.id;

                if (id.match(/delete-x-[0-9]+/) || id.match(/delete-button-[0-9]+/)) {
                    const buttonId = id.split("-")[2];
                    document.getElementById(`button-container-${buttonId}`).remove();

                    editNum(Number(buttonId));

                    buttonNum--;
                }
            }

            return deleteButton;
        },
        spacer: () => {
            const spacer = document.createElement("div");
            spacer.style = "padding-bottom: 0.5em";

            return spacer;
        },
        buttonContainer: () => {
            const buttonContainer = document.createElement("div");
            buttonContainer.className = "button card container";
            buttonContainer.style = "margin-bottom: 0.5em";
            buttonContainer.id = `button-container-${buttonNum}`;

            return buttonContainer;
        }
    }

    const container = elements.buttonContainer();
    container.appendChild(elements.buttonNameElement());
    container.appendChild(elements.labelElement());
    container.appendChild(elements.urlElement());
    container.appendChild(elements.deleteButton());
    container.appendChild(elements.spacer());

    return container;
}

function addButtonForm() {
    const buttonForm = createButtonForm();
    document.getElementById("buttons").appendChild(buttonForm);
    buttonNum++;
}

document.getElementById("button-add-button").onclick = addButtonForm;