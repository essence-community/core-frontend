import {camelCaseMemoized, IBuilderConfig, IClassProps, mapComponents} from "@essence/essence-constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants/variables";
import {Badge} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import {useStyles} from "./BadgeBtn.styles";

// @ts-ignore
export const BadgeBtn: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, children} = props;
    const classes = useStyles(props);
    const getGlobal = props.bc.getglobal && camelCaseMemoized(props.bc.getglobal);

    return useObserver(() => {
        const value = getGlobal ? pageStore.globalValues.get(getGlobal) : "";
        const count = parseInt(`${value || "0"}`, 10);

        if (count) {
            return (
                <Badge
                    classes={props.bc.position === "inside" ? classes : undefined}
                    badgeContent={count}
                    color="primary"
                >
                    {children
                        ? children
                        : mapComponents(
                              bc.childs,
                              (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                                  <Child {...props} bc={childBc} key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} />
                              ),
                          )}
                </Badge>
            );
        }

        if (children) {
            return children;
        }

        return (
            <>
                {mapComponents(bc.childs, (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                    <Child {...props} bc={childBc} key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} />
                ))}
            </>
        );
    });
};
