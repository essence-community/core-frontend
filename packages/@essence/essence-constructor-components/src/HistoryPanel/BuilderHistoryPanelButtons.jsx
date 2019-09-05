// @flow
import * as React from "react";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import Grid from "@material-ui/core/Grid/Grid";
import {getComponent} from "@essence/essence-constructor-share";
import {buttonDirection, styleTheme} from "../constants";
import GridAudit from "../Grid/GridComponents/GridAudit";
import BuilderMobxButton from "../Button/BuilderMobxButton";
import BuilderButtonCollector from "../Button/BuilderButtonCollector/BuilderButtonCollector";
import {type HistoryModelType} from "../stores/HistoryModel";
import {type PageModelType} from "../stores/PageModel";
import {type BuilderHistoryPanelType} from "./BuilderHistoryPanelType";

type PropsType = {
    disabled?: boolean,
    readOnly?: boolean,
    store: HistoryModelType,
    bc: BuilderHistoryPanelType,
    pageStore: PageModelType,
    visible: boolean,
    editing: boolean,
};

class BuilderHistoryPanelButtons extends React.Component<PropsType> {
    activeElement: ?HTMLElement = null;

    static contextTypes = {
        form: PropTypes.object,
    };

    getSnapshotBeforeUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            this.activeElement = document.activeElement;
        }

        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.editing && !this.props.editing) {
            this.restoreFocusElement();
        }
    }

    componentWillUnmount() {
        this.activeElement = null;
    }

    restoreFocusElement = () => {
        if (this.activeElement) {
            this.activeElement.focus();

            this.activeElement = null;
        }
    };

    renderGridAuditButton = (buttonProps: Object) => ({onOpen}) => {
        const {disabled, pageStore, store} = this.props;
        const {overrides} = store.btnsConfig;

        return (
            <BuilderMobxButton
                bc={overrides["Override Audit Button"]}
                disabled={disabled}
                color="inherit"
                pageStore={pageStore}
                handleClick={onOpen}
                {...buttonProps}
            />
        );
    };

    renderStaticButtons = ({buttonProps, handleClose}: Object): Array<React.Node> => {
        const {bc, store, pageStore} = this.props;
        const {overrides} = store.btnsConfig;
        const {btnaudit} = bc;
        const btns = [];

        if (btnaudit === "true") {
            btns.push(
                <GridAudit
                    parentStore={store}
                    bc={overrides["Override Audit Button"]}
                    key="grid-audit"
                    pageStore={pageStore}
                    onClose={handleClose}
                >
                    {this.renderGridAuditButton(buttonProps)}
                </GridAudit>,
            );
        }

        return btns;
    };

    render() {
        const {disabled, store, readOnly, pageStore, editing, visible, bc} = this.props;
        const {btnrefresh, btndelete} = bc;
        const {btns, btnsCollector, overrides} = store.btnsConfig;
        const {records, selectedRecordIndex} = store.recordsStore;
        const onlyIcon = styleTheme === "dark" ? true : undefined;
        const showStaticBtns = !btnsCollector || btnsCollector.every((btn) => btn.btncollectorall !== "true");

        return (
            <Grid
                container
                alignItems="center"
                spacing={8}
                direction={buttonDirection}
                className={editing ? "hidden" : undefined}
            >
                <Grid item>
                    <BuilderMobxButton
                        bc={overrides["Override Add Button"]}
                        disabled={disabled}
                        readOnly={readOnly}
                        variant="fab"
                        pageStore={pageStore}
                        visible={visible}
                    />
                </Grid>
                <Grid item>
                    <BuilderMobxButton
                        bc={overrides["Override Edit Button"]}
                        disabled={disabled || selectedRecordIndex === -1 || selectedRecordIndex !== 0}
                        readOnly={readOnly}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                </Grid>
                <Grid item>
                    <BuilderMobxButton
                        bc={overrides["Override Clone Button"]}
                        disabled={disabled || selectedRecordIndex === -1}
                        readOnly={readOnly}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                </Grid>
                {btndelete === "true" && (
                    <Grid item>
                        <BuilderMobxButton
                            bc={overrides["Override Delete Button"]}
                            disabled={disabled || selectedRecordIndex === -1 || selectedRecordIndex !== 0}
                            readOnly={readOnly}
                            color="inherit"
                            pageStore={pageStore}
                            visible={visible}
                        />
                    </Grid>
                )}
                {btnrefresh === "true" && (
                    <Grid item>
                        <BuilderMobxButton
                            bc={overrides["Override Refresh Button"]}
                            disabled={disabled}
                            color="inherit"
                            pageStore={pageStore}
                            visible={visible}
                        />
                    </Grid>
                )}
                <Grid item>
                    <BuilderMobxButton
                        bc={overrides["Override Left Button"]}
                        disabled={disabled || records.length === 0 || selectedRecordIndex === records.length - 1}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                </Grid>
                <Grid item>
                    <BuilderMobxButton
                        bc={overrides["Override Right Button"]}
                        disabled={disabled || selectedRecordIndex <= 0}
                        color="inherit"
                        pageStore={pageStore}
                        visible={visible}
                    />
                </Grid>
                {btns.map((btn) => {
                    const BtnComponent = getComponent(btn.type);

                    if (!BtnComponent) {
                        return null;
                    }

                    return (
                        <Grid item key={btn.ckPageObject}>
                            <BtnComponent
                                bc={btn}
                                disabled={disabled}
                                readOnly={readOnly}
                                color="inherit"
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                    );
                })}

                {showStaticBtns
                    ? this.renderStaticButtons({}).map((btn, index) => (
                          <Grid item key={index}>
                              {btn}
                          </Grid>
                      ))
                    : null}

                {btnsCollector
                    ? btnsCollector.map((btn) => (
                          <Grid item key={btn.ckPageObject}>
                              <BuilderButtonCollector
                                  onlyicon={onlyIcon}
                                  bc={btn}
                                  disabled={disabled}
                                  readOnly={readOnly}
                                  color="inherit"
                                  renderGridButtons={this.renderStaticButtons}
                                  pageStore={pageStore}
                                  visible={visible}
                              />
                          </Grid>
                      ))
                    : null}
            </Grid>
        );
    }
}

export default observer(BuilderHistoryPanelButtons);
