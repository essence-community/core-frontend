import * as React from "react";
import {IPageModel, IBuilderConfig} from "../../types";
import {makeRedirect} from "../../utils";

export function makeRenderers(pageStore: IPageModel, bc: IBuilderConfig) {
    return {
        link: ({href, children}: any) => (
            <a
                href={href}
                onClick={(event) => {
                    event.preventDefault();

                    makeRedirect({...bc, redirecturl: href}, pageStore);
                }}
            >
                {children}
            </a>
        ),
    };
}
