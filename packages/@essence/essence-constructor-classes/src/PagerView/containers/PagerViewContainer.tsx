import * as React from "react";
import {IClassProps, IEssenceTheme} from "@essence-community/constructor-share/types";
import {Grid, useTheme} from "@material-ui/core";
import {mapComponents} from "@essence-community/constructor-share/components";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";

const DARK_PAPER_ELEVATION = 8;

export const PagerViewContainer: React.FC<IClassProps> = (props) => {
    const {pageStore} = props;
    const theme = useTheme<IEssenceTheme>();

    return (
        <Grid container spacing={2}>
            {mapComponents(pageStore.pageBc, (ChildComponent, childBc) => (
                <Grid key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} item xs={12} style={toColumnStyleWidth(childBc.width)}>
                    <ChildComponent
                        readOnly={pageStore.isReadOnly}
                        pageStore={pageStore}
                        bc={childBc}
                        visible={pageStore.visible}
                        elevation={theme.essence.layoutTheme === 1 ? undefined : DARK_PAPER_ELEVATION}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
