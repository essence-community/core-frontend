import React from "react";
import {FieldValue} from "@essence-community/constructor-share";

export const renderGlobalValuesInfo = (globalValues: [string, FieldValue][]) => {
    const blocks: JSX.Element[] = [];

    globalValues.forEach(([key, value]) => {
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
