import * as React from "react";
import {Box} from "@material-ui/core";
import {IPromoBlockImageProps} from "./PromoBlockImage.types";

export const PromoBlockImage: React.FC<IPromoBlockImageProps> = (props) => {
    const {position = "absolute", data, root, className} = props;

    return (
        <Box
            position={position}
            width={data[1]}
            height={data[2]}
            left={data[3] || "unset"}
            top={data[4] || "unset"}
            right={root ? 0 : "unset"}
            style={{
                background: `url(${data[0]}) no-repeat`,
            }}
            className={className}
        >
            {props.children}
        </Box>
    );
};
