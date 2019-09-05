// @flow
export const BaseGridRowStylesDark = (theme: any) => ({
    root: {
        "&$selected": {
            backgroundColor: theme.palette.common.selectedRecord,
            boxShadow: `inset 0px 0px 0px 2px ${theme.palette.common.selectedRecordBorder}`,
        },
        "&$selectedDetail": {
            backgroundColor: theme.palette.common.selectedRecord,
            boxShadow: `inset -1px -1px 0px 1px ${theme.palette.common.selectedRecordBorder}, inset 1px -1px 0px 1px ${
                theme.palette.common.selectedRecordBorder
            }`,
        },
        "&$selectedDetailExpanded": {
            backgroundColor: theme.palette.common.selectedRecord,
            boxShadow: `inset -1px 1px 0px 1px ${theme.palette.common.selectedRecordBorder}, inset 1px 1px 0px 1px ${
                theme.palette.common.selectedRecordBorder
            }`,
        },
    },
});
