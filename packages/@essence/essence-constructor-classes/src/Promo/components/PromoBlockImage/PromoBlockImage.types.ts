import {BoxProps} from "@material-ui/core";

export interface IPromoBlockImageProps {
    data: [string, string, string, string?, string?];
    root?: boolean;
    position?: BoxProps["position"];
    className?: string;
}
