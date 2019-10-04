import {IEssenceTheme} from "@essence/essence-constructor-share";

export default (theme: IEssenceTheme) => ({
    horizontalButton: {
        border: `1px solid ${theme.palette.primary.main}`,
        width: 30,
    },
    verticalButton: {
        border: `1px solid ${theme.palette.primary.main}`,
        height: 30,
        width: "100%",
    },
});
