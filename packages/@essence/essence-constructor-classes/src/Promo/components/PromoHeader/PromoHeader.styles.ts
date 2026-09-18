import {makeStyles} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    () => ({
        content: {
            zIndex: 1,
        },
        img: {
            "@media (min-width: 1024px)": {
                height: 307,
                width: 512,
            },
        },
    }),
    {
        name: "EssencePromoHeader",
    },
);
