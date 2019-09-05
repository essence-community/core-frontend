// @flow
import * as React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

type PropsType = {
    firstPathClassName?: string,
    secondPathClassName?: string,
};

const IconBflLine = ({firstPathClassName, secondPathClassName, ...otherProps}: PropsType) => (
    <SvgIcon viewBox="0 0 45 100" x="0px" y="0px" style={{enableBackground: "new 0 0 45 100;"}} {...otherProps}>
        <g>
            <path
                className={firstPathClassName}
                d={
                    "M42.2,57.4l-38.8,39c-0.2,0.2-0.6,0.1-0.6-0.2V44.6c0-8.6,2.3-17.2," +
                    "6.9-24.4c5.6-8.8,15.4-17.6,32.5-17.6v37 L17.5,64.9"
                }
                strokeLinecap="round"
                strokeLinejoin="null"
                strokeDasharray="null"
                strokeWidth="5"
                fill="transparent"
            />

            <path
                className={secondPathClassName}
                d="M19.8,97.5l21.7-21.9c0.2-0.2,0.6-0.1,0.6,0.2v21.7"
                strokeLinecap="round"
                strokeLinejoin="null"
                strokeDasharray="null"
                strokeWidth="5"
                fill="transparent"
            />
        </g>
    </SvgIcon>
);

export default IconBflLine;
