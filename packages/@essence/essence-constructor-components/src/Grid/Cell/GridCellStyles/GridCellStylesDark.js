// @flow
export const GridCellStylesDark = (theme: any) => ({
    root: {
        "&:first-of-type": {
            border: "none",
        },
        "&:last-child": {
            borderRight: "none",
        },
        borderBottom: "none",
        borderRight: `1px solid ${theme.palette.grey.arrow}`,
        width: "calc(100% - 1px)",
    },
});
