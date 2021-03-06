import React from "react";
import {FieldValue} from "@essence-community/constructor-share";

export const renderGlobalValuelsInfo = (globalValues: Map<string, FieldValue>) => {
    const blocks: JSX.Element[] = [];

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
