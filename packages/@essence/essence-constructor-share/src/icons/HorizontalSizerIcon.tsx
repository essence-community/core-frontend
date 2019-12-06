import * as React from "react";
import {SvgIcon, useTheme} from "@material-ui/core";
import {SvgIconProps} from "@material-ui/core/SvgIcon";
import {IEssenceTheme} from "../types";

export const HorizontalSizerIcon: React.FC<SvgIconProps> = React.forwardRef((props, ref) => {
    const theme = useTheme<IEssenceTheme>();

    return (
        <SvgIcon {...props} ref={ref}>
            <g xmlns="http://www.w3.org/2000/svg" transform="translate(24) rotate(90)">
                <path
                    d="M224.605,417.318l1.932-3.864h-3.864Z"
                    transform="translate(-212.177 -395.167)"
                    fill={theme.palette.secondary.main}
                />
                <path
                    d="M224.605,31.454l-1.932,3.864h3.864Z"
                    transform="translate(-212.177 -29.631)"
                    fill={theme.palette.secondary.main}
                />
                <path
                    d="M203.156,196.653h-5.713a.571.571,0,0,0,0,1.143h5.713a.571.571,0,1,0,0-1.143Z"
                    transform="translate(-187.872 -188.093)"
                    fill={theme.palette.primary.main}
                />
                <path
                    d="M203.156,245.926h-5.713a.571.571,0,1,0,0,1.143h5.713a.571.571,0,0,0,0-1.143Z"
                    transform="translate(-187.872 -234.51)"
                    fill={theme.palette.primary.main}
                />
                <path
                    d="M203.156,295.2h-5.713a.571.571,0,1,0,0,1.143h5.713a.571.571,0,0,0,0-1.143Z"
                    transform="translate(-187.872 -280.927)"
                    fill={theme.palette.primary.main}
                />
                <path
                    // eslint-disable-next-line max-len
                    d="M197.445,6.83h5.713A.572.572,0,0,0,203.669,6L200.812.29a.6.6,0,0,0-1.022,0L196.934,6a.571.571,0,0,0,.511.827ZM200.3,1.823l1.932,3.864h-3.864Z"
                    transform="translate(-187.873 0)"
                    fill={theme.palette.primary.main}
                />
                <path
                    // eslint-disable-next-line max-len
                    d="M203.158,393.745h-5.713a.572.572,0,0,0-.511.827l2.856,5.713a.571.571,0,0,0,1.022,0l2.856-5.713a.572.572,0,0,0-.511-.827Zm-2.856,5.007-1.932-3.864h3.864Z"
                    transform="translate(-187.873 -376.6)"
                    fill={theme.palette.primary.main}
                />
            </g>
        </SvgIcon>
    );
});
