// @flow
import * as React from "react";
import {type NextComponentReturnType} from "./PageModelType";

export const renderGlobalValuelsInfo = (globalValues: Map<string, mixed>) => {
    const blocks = [];

    globalValues.forEach((value: mixed, key: string) => {
        blocks.push(
            <div key={key} className="debug-info">
                <span className="debug-info-key">{key}</span>:{" "}
                <span className="debug-info-value">{JSON.stringify(value)}</span>
            </div>,
        );
    });

    return (
        <div>
            <hr />
            {blocks}
        </div>
    );
};

export function getNextComponent(stepname: string, parentsBc: any, cb: Function): NextComponentReturnType {
    for (const bc of parentsBc) {
        if (bc.stepname === stepname) {
            return {childBc: bc, lastChildBc: bc};
        }

        if (bc.childs) {
            const {childBc, lastChildBc} = getNextComponent(stepname, bc.childs, cb);

            if (lastChildBc) {
                cb(childBc, bc);

                return {childBc: bc, lastChildBc};
            }
        }
    }

    return {};
}
