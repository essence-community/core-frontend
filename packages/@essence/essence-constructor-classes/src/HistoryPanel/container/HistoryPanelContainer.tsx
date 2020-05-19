import * as React from "react";
import {Grid, Paper} from "@material-ui/core";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {toTranslateText} from "@essence-community/constructor-share/utils/transform";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants/variables";
import {EmptyTitle} from "@essence-community/constructor-share/uicomponents/EmptyTitle";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {HistoryPanelWrapper} from "../component/HistoryPanelWrapper/HistoryPanelWrapper";

export interface IPanelContainerProps extends IClassProps {
    hideTitle?: boolean;
}
export const HistoryPanelContainer: React.FC<IPanelContainerProps> = (props) => {
    const {hideTitle, bc, elevation} = props;
    const [trans] = useTranslation("meta");

    const renderPanel = React.useMemo(() => {
        if (!hideTitle && bc[VAR_RECORD_DISPLAYED]) {
            return () => (
                <Grid container spacing={0} direction="column">
                    <Grid item xs>
                        <EmptyTitle
                            title={toTranslateText(trans, bc[VAR_RECORD_DISPLAYED])}
                            filters={bc.filters}
                            slim={false}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <HistoryPanelWrapper {...props} />
                    </Grid>
                </Grid>
            );
        }

        return () => <HistoryPanelWrapper {...props} />;
    }, [bc, hideTitle, props, trans]);

    const formBc = React.useMemo<IBuilderConfig>(() => ({...bc, type: "FORMPANEL.NOCOMMONDECORATOR"}), [bc]);

    return (
        <>
            {mapComponentOne(formBc, (Child, childBc) => (
                <Child key={childBc.ck_page_object} {...props} bc={childBc}>
                    {elevation ? (
                        <Paper className="paper-overflow-hidden" elevation={elevation}>
                            {renderPanel()}
                        </Paper>
                    ) : (
                        renderPanel()
                    )}
                </Child>
            ))}
        </>
    );
};
