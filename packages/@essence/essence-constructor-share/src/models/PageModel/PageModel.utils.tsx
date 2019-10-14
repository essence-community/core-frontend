import * as React from "react";
import {ObservableMap} from "mobx";
import {FieldValue, IBuilderConfig, INextComponentReturn} from "../../types";

export const renderGlobalValuelsInfo = (globalValues: ObservableMap<string, FieldValue>) => {
    const blocks: React.ReactChild[] = [];

    globalValues.forEach((value: FieldValue, key: string) => {
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

export function getNextComponent(stepname: string, parentsBc: IBuilderConfig[], cb: Function): INextComponentReturn {
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
