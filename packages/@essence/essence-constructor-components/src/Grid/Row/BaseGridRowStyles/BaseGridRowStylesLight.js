// @flow
export const BaseGridRowStylesLight = (theme: any) => ({
    root: {
        "&$selected": {
            backgroundColor: theme.palette.common.selectedRecord,
        },
        "&$selectedDetailExpanded": {
            backgroundColor: theme.palette.common.selectedRecord,
        },
    },
});
