import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import {Grid} from "@material-ui/core";
import * as React from "react";
import {GRID_ALIGN_CONFIGS, GRID_CONFIGS} from "@essence-community/constructor-share/constants/ui";
import {useModel} from "@essence-community/constructor-share/hooks";
import {RecordContext} from "@essence-community/constructor-share/context";
import {reaction} from "mobx";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {IBuilderConfig, IClassProps} from "@essence-community/constructor-share/types";
import {DynamicButtonModel, IChildren} from "../store/DynamicButtonModel";
import {ButtonMenu} from "../components/ButtonMenu";

const DEFAULT_SPACING = 1;

// eslint-disable-next-line max-lines-per-function
export const ButtonDynamic: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, hidden, disabled} = props;
    const {contentview = "hbox", align = "left"} = bc;

    const recordCtx = React.useContext(RecordContext);
    const [btnsConfig, setBtnsConfig] = React.useState<IChildren[]>(null);
    const [btnsMenuConfig, setBtnsMenuConfig] = React.useState<IChildren[]>(null);
    const [store] = useModel((modelProps) => new DynamicButtonModel(modelProps), {
        bc,
        disabled,
        hidden,
        pageStore,
    });
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height,
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
        }),
        [bc.height, bc.maxheight, bc.minheight],
    );

    React.useEffect(
        () =>
            reaction(
                () => store.btns,
                (btns = []) => {
                    const tmpBtns = btns.map(({bc, rec}) => ({bc, rec: {...rec, ...(recordCtx || {})}}));

                    if (contentview !== "menu" && bc.maxsize) {
                        const maxsize = parseInt(bc.maxsize, 10);

                        setBtnsConfig(tmpBtns.slice(0, maxsize));
                        setBtnsMenuConfig(
                            tmpBtns.slice(maxsize).map(({bc: bcBtn, rec}) => ({
                                bc: {...bcBtn, uitype: "8"},
                                rec,
                            })),
                        );
                    } else {
                        setBtnsConfig(tmpBtns);
                    }
                },
            ),
        [bc.maxsize, contentview, recordCtx, store],
    );

    if (contentview === "menu") {
        return <ButtonMenu {...props} btns={btnsConfig}></ButtonMenu>;
    }

    return (
        <Grid
            container
            spacing={DEFAULT_SPACING}
            style={contentStyle}
            {...((contentview && GRID_CONFIGS[contentview]) || GRID_CONFIGS.hbox)}
            {...((contentview && align && GRID_ALIGN_CONFIGS[`${align}-${contentview}`]) ||
                GRID_ALIGN_CONFIGS["left-hbox"])}
        >
            {btnsConfig
                ? btnsConfig.map(({rec, bc}) =>
                      mapComponentOne(bc, (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                          <Grid item xs={true} key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                              <RecordContext.Provider value={rec}>
                                  <Child {...props} bc={childBc} />
                              </RecordContext.Provider>
                          </Grid>
                      )),
                  )
                : null}
            {btnsMenuConfig && btnsMenuConfig.length ? (
                <Grid item xs={true}>
                    <ButtonMenu {...props} btns={btnsMenuConfig}></ButtonMenu>
                </Grid>
            ) : null}
        </Grid>
    );
};
