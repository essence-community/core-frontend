// @flow
import * as React from "react";
import camelCase from "lodash/camelCase";
import Grid from "@material-ui/core/Grid";
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

class BuilderFieldPeriodSplit extends React.Component<PropsType> {
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
        } = this.props;

        const columnStartCase = camelCase(columnstart);
        const columnEndCase = camelCase(columnend);

        if (isEmpty(columnstart)) {
            logger(`Required param "columnstart" empty ck_page_object: ${ckPageObject}`);
        }
        if (isEmpty(columnend)) {
            logger(`Required param "columnend" empty ck_page_object: ${ckPageObject}`);
        }

        this.bcStart = {
            ckPageObject,
            column: columnStartCase,
            cvDisplayed: `${cvDisplayed} с`,
            disabledstartdate: columnEndCase,
            rules: `before_not_required:${columnEndCase}`,
            validaterelated: `${columnEndCase}`,
            ...childBc,
        };

        this.bcEnd = {
            ckPageObject,
            column: columnEndCase,
            cvDisplayed: `${cvDisplayed} по`,
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
            <Grid container wrap="nowrap" spacing={8} alignItems="center">
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

export default commonDecorator(BuilderFieldPeriodSplit);
