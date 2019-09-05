// @flow
import * as React from "react";
import {observer, disposeOnUnmount} from "mobx-react";
import {reaction} from "mobx";
import {compose} from "recompose";
import Grid from "@material-ui/core/Grid/Grid";
import {setComponent, mapComponents} from "@essence/essence-constructor-share";
import {toColumnStyleWidth, camelCaseMemoized} from "@essence/essence-constructor-share/utils";
import forOwn from "lodash/forOwn";
import {findSetKey} from "../utils/findKey";
import BuilderForm from "./BuilderForm";
import {type PropsType, type StateType} from "./FormPanelTypes";

class FormPanelComponent extends React.Component<PropsType, StateType> {
    state = {
        initialValues: {},
    };

    componentDidMount() {
        const {bc, pageStore} = this.props;

        if (bc.getglobal) {
            disposeOnUnmount(this, [
                reaction(() => pageStore.globalValues.get(camelCaseMemoized(bc.getglobal)), this.handleGetGlobal),
            ]);
        }
    }

    handleGetGlobal = (values: mixed) => {
        if (values) {
            if (typeof values === "string") {
                this.setState({initialValues: JSON.parse(values)});
            } else {
                this.setState({initialValues: values});
            }
        }
    };

    handleSetGlobal = (values: Object) => {
        const {setglobal} = this.props.bc;

        if (setglobal) {
            const globalValues = {};
            const keys = findSetKey(setglobal);

            forOwn(keys, (fieldName, globaleKey) => {
                globalValues[globaleKey] = values;
            });

            this.props.pageStore.updateGlobalValues(globalValues);
        }
    };

    handleSearch = (values: Object) => {
        this.handleSetGlobal(values);
    };

    handleSetValues = (values: Object) => {
        this.handleSetGlobal(values);
    };

    render() {
        const {bc, disabled, pageStore, visible, parentBc} = this.props;
        const {initialValues} = this.state;
        const {width} = bc;

        return (
            <BuilderForm
                onSubmit={this.handleSearch}
                onSetValues={this.handleSetValues}
                injectType="filter"
                submitOnChange
                dataPageObject={`${bc.ckPageObject}-form`}
                mode="1"
                initialValues={initialValues}
                pageStore={pageStore}
                hasMaster={parentBc && Boolean(parentBc.ckMaster) && parentBc.ckMaster !== bc.ckPageObject}
                style={width ? {width} : undefined}
            >
                <Grid container spacing={8} alignItems="center">
                    {mapComponents(bc.childs, (ChildComp, child) => (
                        <Grid item key={child.ckPageObject} xs={12} style={toColumnStyleWidth(child.width)}>
                            <ChildComp
                                bc={child}
                                editing
                                disabled={disabled}
                                pageStore={pageStore}
                                visible={visible}
                                tabIndex={"-1"}
                            />
                        </Grid>
                    ))}
                </Grid>
            </BuilderForm>
        );
    }
}

export const FormPanel = compose(observer)(FormPanelComponent);

setComponent("FORMPANEL", FormPanel);
