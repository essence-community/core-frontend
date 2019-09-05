export const isIE = () => {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ");

    return msie > 0 || Boolean(navigator.userAgent.match(/Trident.*rv:11\./));
};

export const getAbsoluteOffsetFromGivenElement = (el?: HTMLElement, relativeEl?: HTMLElement) => {
    let currentEl: HTMLElement = el;
    // tslint:disable:variable-name
    let _x: number = 0;
    // tslint:disable:variable-name
    let _y: number = 0;

    if (!relativeEl) {
        return {left: _x, top: _y};
    }

    while (currentEl && currentEl !== relativeEl && !isNaN(currentEl.offsetLeft) && !isNaN(currentEl.offsetTop)) {
        _x += currentEl.offsetLeft - currentEl.scrollLeft + currentEl.clientLeft;
        _y += currentEl.offsetTop - currentEl.scrollTop + currentEl.clientTop;
        currentEl = currentEl.offsetParent instanceof HTMLElement ? currentEl.offsetParent : null;
    }

    return {left: _x, top: _y};
};

export const loadJS = (url: string, implementationCode: () => void, location: HTMLBodyElement | HTMLDivElement) => {
    /*
     * Url is URL of external file, implementationCode is the code
     * to be called from the file, location is the location to 
     * insert the <script> element
     */

    const scriptTag = document.createElement("script");

    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    // @ts-ignore
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};

export const loadCSS = (url: string, implementationCode: () => void, location: HTMLBodyElement | HTMLDivElement) => {
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
    // @ts-ignore
    linkTag.onreadystatechange = implementationCode;

    location.appendChild(linkTag);
};
