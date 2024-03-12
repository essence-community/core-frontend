import {FieldValue} from "../types";

export const copyToClipboard = (value: FieldValue): Promise<void> => {
    let textToCopy = "";

    if (typeof value !== "string") {
        if (Array.isArray(value)) {
            textToCopy = value.join(", ");
        } else if (typeof value === "object" && value !== null) {
            textToCopy = Object.values(value).join(", ");
        } else {
            textToCopy = String(value || "");
        }
    } else {
        textToCopy = value;
    }

    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // Fallback in case of insecure context or old browsers
        const textArea = document.createElement("textarea");

        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        return new Promise((res, rej) => {
            document.execCommand("copy") ? res() : rej();
            textArea.remove();
        });
    }
};
