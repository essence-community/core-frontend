// @flow
import * as React from "react";
import {compose} from "recompose";
import {Grid} from "@material-ui/core";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence/essence-constructor-share/constants";
import commonDecorator, {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import {loggerRoot} from "../constants";
import {isEmpty} from "../utils/base";
import BuilderField from "../TextField/BuilderField";
import {type PageModelType} from "../stores/PageModel";

const logger = loggerRoot.extend("BuilderFieldPeriodSplit");

type PropsType = CommonDecoratorInjectType & {
    bc: Object,
    pageStore: PageModelType,
    parentKey?: string,
    visible: boolean,
};

class BuilderFieldPeriodSplit extends React.Component<PropsType & WithT> {
    bcStart: Object;

    bcEnd: Object;

    constructor(...args: Array<*>) {
        super(...args);

        const {childs} = this.props.bc;

        if (childs && childs.length === 2) {
            this.iniChildsFields();
        } else {
            this.initDefaultFields();
        }
    }

    iniChildsFields = () => {
        const {childs} = this.props.bc;

        const columnStart = childs[0].column;
        const columnEnd = childs[1].column;

        this.bcStart = {
            disabledstartdate: columnEnd,
            rules: `before_not_required:${columnEnd}`,
            validaterelated: `${columnEnd}`,
            ...childs[0],
        };

        this.bcEnd = {
            disabledenddate: columnStart,
            rules: `after_not_required:${columnStart}`,
            validaterelated: `${columnStart}`,
            ...childs[1],
        };
    };

    initDefaultFields = () => {
        const {
            bc: {
                columnstart,
                columnend,
                [VAR_RECORD_DISPLAYED]: displayed,
                [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
                ...childBc
            },
            // eslint-disable-next-line id-length
            t,
        } = this.props;

        if (isEmpty(columnstart)) {
            logger(`Required param "columnstart" empty ck_page_object: ${ckPageObject}`);
        }
        if (isEmpty(columnend)) {
            logger(`Required param "columnend" empty ck_page_object: ${ckPageObject}`);
        }

        const transCvDisplayed = t(displayed);

        this.bcStart = {
            [VAR_RECORD_DISPLAYED]: `${transCvDisplayed} $t(static:d7d40d765f0840beb7f0db2b9298ac0c)`,
            [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
            column: columnstart,
            disabledstartdate: columnend,
            rules: `before_not_required:${columnend}`,
            validaterelated: `${columnend}`,
            ...childBc,
        };

        this.bcEnd = {
            [VAR_RECORD_DISPLAYED]: `${transCvDisplayed} $t(static:acc7f22ccbc6407bb253f8c47a684c45)`,
            [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
            column: columnend,
            disabledenddate: columnstart,
            rules: `after_not_required:${columnstart}`,
            validaterelated: `${columnstart}`,
            ...childBc,
        };
    };

    render() {
        const {visible, hidden} = this.props;

        if (hidden) {
            return null;
        }

        return (
            <Grid container wrap="nowrap" spacing={1} alignItems="center">
                <Grid item xs zeroMinWidth>
                    <BuilderField {...this.props} bc={this.bcStart} visible={visible} />
                </Grid>
                <Grid item>-</Grid>
                <Grid item xs zeroMinWidth>
                    <BuilderField {...this.props} bc={this.bcEnd} visible={visible} />
                </Grid>
            </Grid>
        );
    }
}

export default compose(withTranslation("meta"), commonDecorator)(BuilderFieldPeriodSplit);
