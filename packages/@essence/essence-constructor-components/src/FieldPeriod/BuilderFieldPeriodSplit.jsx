// @flow
import * as React from "react";
import camelCase from "lodash/camelCase";
import {compose} from "recompose";
import {Grid} from "@material-ui/core";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
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

        const columnStartCase = camelCase(childs[0].column);
        const columnEndCase = camelCase(childs[1].column);

        this.bcStart = {
            disabledstartdate: columnEndCase,
            rules: `before_not_required:${columnEndCase}`,
            validaterelated: `${columnEndCase}`,
            ...childs[0],
        };

        this.bcEnd = {
            disabledenddate: columnStartCase,
            rules: `after_not_required:${columnStartCase}`,
            validaterelated: `${columnStartCase}`,
            ...childs[1],
        };
    };

    initDefaultFields = () => {
        const {
            bc: {columnstart, columnend, cvDisplayed, ckPageObject, ...childBc},
            // eslint-disable-next-line id-length
            t,
        } = this.props;

        const columnStartCase = camelCase(columnstart);
        const columnEndCase = camelCase(columnend);

        if (isEmpty(columnstart)) {
            logger(`Required param "columnstart" empty ck_page_object: ${ckPageObject}`);
        }
        if (isEmpty(columnend)) {
            logger(`Required param "columnend" empty ck_page_object: ${ckPageObject}`);
        }

        const transCvDisplayed = t(cvDisplayed);

        this.bcStart = {
            ckPageObject,
            column: columnStartCase,
            cvDisplayed: `${transCvDisplayed} {{d7d40d765f0840beb7f0db2b9298ac0c}}`,
            disabledstartdate: columnEndCase,
            rules: `before_not_required:${columnEndCase}`,
            validaterelated: `${columnEndCase}`,
            ...childBc,
        };

        this.bcEnd = {
            ckPageObject,
            column: columnEndCase,
            cvDisplayed: `${transCvDisplayed} {{acc7f22ccbc6407bb253f8c47a684c45}}`,
            disabledenddate: columnStartCase,
            rules: `after_not_required:${columnStartCase}`,
            validaterelated: `${columnStartCase}`,
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

export default compose(
    withTranslation("meta"),
    commonDecorator,
)(BuilderFieldPeriodSplit);
