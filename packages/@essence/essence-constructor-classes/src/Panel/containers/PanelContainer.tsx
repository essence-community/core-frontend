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

type RenderPanelType = (isFormPanel?: boolean) => React.ReactElement | null;
type RenderFnType = (render: RenderPanelType) => React.ReactElement | null;

export interface IPanelContainerProps extends IClassProps {
    hideTitle?: boolean;
}
export const PanelContainer: React.FC<IPanelContainerProps> = React.memo(function PanelContainerMemo(
    props,
): React.ReactElement | null {
    const {hideTitle, bc, elevation} = props;
    const {collapsible, editmodepanel} = bc;
    const [trans] = useTranslation("meta");
    const isHiddenTitle = React.useMemo(() => hideTitle || collapsible, [hideTitle, collapsible]);
    const collapseBc = React.useMemo(
        () => ({
            ...bc,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-collapsible-panel`,
            type: "PANELCOLLAPSED.NOCOMMONDECORATOR",
        }),
        [bc],
    );
    const formBc = React.useMemo(() => ({...bc, type: "FORMPANEL.NOCOMMONDECORATOR"}), [bc]);
    const collapsePanel: RenderFnType = (render: RenderPanelType): React.ReactElement | null => {
        if (collapsible) {
            return mapComponentOne(collapseBc, (Child, childBc) => (
                <Child key={childBc.ck_page_object} {...props} bc={childBc}>
                    {render(true)}
                </Child>
            ));
        }

        return render();
    };

    const formPanel: RenderFnType = (render: RenderPanelType) => {
        if (editmodepanel) {
            return mapComponentOne(formBc, (Child, childBc) => (
                <Child key={childBc.ck_page_object} {...props} bc={childBc}>
                    <PanelForm {...props}>{render(true)}</PanelForm>
                </Child>
            ));
        }
        if (!isHiddenTitle && bc[VAR_RECORD_DISPLAYED]) {
            return (
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

        return <PanelWrapper {...props}>{render()}</PanelWrapper>;
    };

    if (elevation && editmodepanel) {
        return (
            <Paper className="paper-overflow-hidden" elevation={elevation}>
                {collapsePanel((isFormPanelCollabsible = false) =>
                    formPanel((isFormPanel = isFormPanelCollabsible) => (
                        <Panel {...props} isFormPanel={isFormPanel} elevation={undefined}></Panel>
                    )),
                )}
            </Paper>
        );
    }

    return collapsePanel((isFormPanelCollabsible = false) =>
        formPanel((isFormPanel = isFormPanelCollabsible) => <Panel {...props} isFormPanel={isFormPanel}></Panel>),
    );
});
