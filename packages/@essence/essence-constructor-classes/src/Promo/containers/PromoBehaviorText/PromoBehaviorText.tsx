import * as React from "react";
import {observer} from "mobx-react";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {mapComponentOne} from "@essence-community/constructor-share";

export const PromoBehaviorText: React.FC<IClassProps> = observer((props) => {
    const {
        bc,
        pageStore: {globalValues},
    } = props;

    
        const childBc: IBuilderConfig = {
            ...bc,
            column: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-demo-text`,
            datatype: "text",
            disabledrules: bc.disabledrules && `${globalValues.get(bc.disabledrules)} === 1`,
            hiddenrules: bc.hiddenrules && `${globalValues.get(bc.hiddenrules)} === 1`,
            requiredrules: bc.requiredrules && `${globalValues.get(bc.requiredrules)} === 1`,
            type: "IFIELD",
        };

        childBc.column += `${childBc.disabledrules} ${childBc.hiddenrules} ${childBc.requiredrules}`;

        return (
            <React.Fragment>
                {mapComponentOne(childBc, (ChildCmp) => (
                    <ChildCmp {...props} bc={childBc} />
                ))}
            </React.Fragment>
        );
});
