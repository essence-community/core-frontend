import * as React from "react";
import {Grid, Paper} from "@material-ui/core";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {toTranslateText} from "@essence-community/constructor-share/utils/transform";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants/variables";
import {EmptyTitle} from "@essence-community/constructor-share/uicomponents/EmptyTitle";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {PanelWrapper} from "../components/PanelWrapper/PanelWrapper";
import {PanelForm} from "../components/PanelForm/PanelForm";
import {Panel} from "../components/Panel/Panel";

type renderFn = (render?: renderFn) => any;

export interface IPanelContainerProps extends IClassProps {
    hideTitle?: boolean;
}
export const PanelContainer: React.FC<IPanelContainerProps> = (props) => {
    const {hideTitle, bc, elevation} = props;
    const {collapsible, editmodepanel} = bc;
    const [trans] = useTranslation("meta");
    const [isHiddenTitle, setHiddenTitle] = React.useState<boolean>(hideTitle || false);
    const collapsePanel: renderFn = React.useMemo(() => {
        if (collapsible === "true") {
            setHiddenTitle(true);
            const collapseBc = {
                ...bc,
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-collapsible-panel`,
                type: "PANELCOLLAPSED.NOCOMMONDECORATOR",
            };

            return (render: renderFn) =>
                mapComponentOne(collapseBc, (Child, childBc) => (
                    <Child key={childBc.ck_page_object} {...props} bc={childBc}>
                        {render()}
                    </Child>
                ));
        }

        return (render: renderFn) => render();
    }, [bc, collapsible, props]);

    const formPanel: renderFn = React.useMemo(() => {
        if (editmodepanel === "true") {
            const formBc = {...bc, type: "FORMPANEL.NOCOMMONDECORATOR"};

            return (render: renderFn) =>
                mapComponentOne(formBc, (Child, childBc) => (
                    <Child key={childBc.ck_page_object} {...props} bc={childBc}>
                        <PanelForm {...props}>{render()}</PanelForm>
                    </Child>
                ));
        }
        if (!isHiddenTitle && bc[VAR_RECORD_DISPLAYED]) {
            return (render: renderFn) => (
                <Grid container spacing={0} direction="column">
                    <Grid item xs>
                        <EmptyTitle
                            title={toTranslateText(trans, bc[VAR_RECORD_DISPLAYED])}
                            filters={bc.filters}
                            slim={false}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <PanelWrapper {...props}>{render()}</PanelWrapper>
                    </Grid>
                </Grid>
            );
        }

        return (render: renderFn) => <PanelWrapper {...props}>{render()}</PanelWrapper>;
    }, [bc, editmodepanel, isHiddenTitle, props, trans]);

    const content = React.useMemo(() => {
        if (elevation) {
            return (
                <Paper className="paper-overflow-hidden" elevation={elevation}>
                    {collapsePanel(() => formPanel(() => <Panel {...props}></Panel>))}
                </Paper>
            );
        }

        return collapsePanel(() => formPanel(() => <Panel {...props}></Panel>));
    }, [collapsePanel, elevation, formPanel, props]);

    return content;
};
