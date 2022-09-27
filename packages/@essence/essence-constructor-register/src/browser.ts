const loadJS = (url: string, implementationCode: () => void, location: HTMLElement) => {
    /*
     * Url is URL of external file, implementationCode is the code
     * to be called from the file, location is the location to
     * insert the <script> element
     */

    const scriptTag = document.createElement("script");

    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onerror = implementationCode;
    // scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};

const loadCSS = (url: string, implementationCode: () => void, location: HTMLElement) => {
    /*
     * Url is URL of external file, implementationCode is the code
     * to be called from the file, location is the location to
     * insert the <script> element
     */

    const linkTag = document.createElement("link");

    linkTag.href = url;
    linkTag.rel = "stylesheet";
    linkTag.type = "text/css";

    linkTag.onload = implementationCode;
    linkTag.onerror = implementationCode;
    // linkTag.onreadystatechange = implementationCode;

    location.appendChild(linkTag);
};

export function loadFiles(files: string[], isLocal = false): Promise<void[]> {
    return Promise.all(
        files.map((url) => {
            const splitUrl = url.split(".");
            const ext = splitUrl[splitUrl.length - 1];
            const runner = ext === "js" ? loadJS : loadCSS;

            if (ext === "js" || ext === "css") {
                return new Promise<void>((resolve) => {
                    runner(
                        isLocal ? `${url}?t=${Number(new Date())}` : url,
                        () => {
                            resolve();
                            // eslint-disable-next-line no-console
                            console.log(`loaded ${url}`);
                        },
                        document.body,
                    );
                });
            }

            return Promise.resolve();
        }),
    );
}
