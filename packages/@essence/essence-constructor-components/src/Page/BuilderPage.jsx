// @flow
import * as React from "react";
import cn from "classnames";
import {compose} from "recompose";
import {withStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import Scrollbars from "../Components/Scrollbars/Scrollbars";
import {styleTheme, loggerRoot, TAB_KEY_CODE, QUERY_ELEMENT} from "../constants";
import {type PageModelType} from "../stores/PageModel";
import BuilderForm from "../Form/BuilderForm";
import WindowMessage from "../WindowMessage/WindowMessage";
import {prepareTip} from "../Tooltip/Tooltip";
import PageLoader from "./PageLoader";
import {BuilderPageStylesDark} from "./Styles/BuilderPageStylesDark";
import {BuilderPageStylesLight} from "./Styles/BuilderPageStylesLight";
import BuilderPageChildren from "./BuilderPageChildren";
import PageWindows from "./PageWindows";

// Intialize components
import "../HistoryPanel/BuilderHistoryPanel";
import "../Panel/BuilderBasePanel";
import "../TabPanel/BuilderTabPanel";
import "../Grid/BuilderGrid";
import "../FieldSet/BuilderFieldSet";
import "../PanelDynamic/BuilderPanelDynamic";
import "../TextField/BuilderField";
import "../Button/BuilderMobxButton";
import "../Button/BuilderButtonCollector/BuilderButtonCollector";
import "../FilePanel/BuilderFilePanel";
import "../Filter/BuilderFilter";
import "../FieldItemSelector/FieldItemSelector";
import "../FieldPeriod/BuilderFieldPeriod";
import "../EmptySpace/EmptySpace";
import "../Form/FormPanel";
import "../Iframe/BuilderIframe";

const logger = loggerRoot.extend("BuilderPage");
const style = styleTheme === "light" ? BuilderPageStylesLight : BuilderPageStylesDark;
const isActiveElement = (editingPanel: ?HTMLElement) => (el: ?HTMLElement) => editingPanel && editingPanel.contains(el);
const VERTICAL_STYLE = {zIndex: 3};
const SCROLLABRS_STYLE = {height: "100%", paddingRight: 10, width: "100%"};

type OwnPropsType = {
    className?: string,
    pageStore: PageModelType,
    classes?: Object,
    hidden?: boolean,
    visible: boolean,
};
type PropsType = OwnPropsType;

type State = {
    pageEl: ?HTMLDivElement,
};

class BuilderPage extends React.Component<PropsType, State> {
    state = {
        pageEl: null,
    };

    componentDidMount() {
        const {pageStore} = this.props;

        pageStore.setVisibleAction(this.props.visible);

        if (!pageStore.route.clMenu) {
            setTimeout(() => {
                pageStore.applicationStore.pagesStore.removePageAction(pageStore.ckPage);
            });
        }
    }

    componentDidUpdate(prevProps) {
        const {pageStore, visible} = this.props;

        if (visible && !prevProps.visible) {
            pageStore.setVisibleAction(visible);
        }
    }

    componentWillUnmount() {
        const {pageStore} = this.props;

        pageStore.setPageElAction(null);
        pageStore.setPageInnerElAction(null);
    }

    handleSetPageEl = (pageEl: ?HTMLDivElement) => {
        const {pageStore} = this.props;

        this.setState({pageEl});
        pageStore.setPageElAction(pageEl);
    };

    handleSubmit = (values) => {
        logger("Данные отправлены вне формы:", values);
    };

    handleKeyDown = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
        const {shiftKey} = event;
        const {isEdit, pageEl, hiddenPage} = this.props.pageStore;

        if (!hiddenPage && pageEl && event.keyCode === TAB_KEY_CODE) {
            requestAnimationFrame(() => {
                if (
                    !document.activeElement ||
                    !pageEl.contains(document.activeElement) ||
                    (isEdit && !isActiveElement(pageEl.querySelector(".panel-editing-focus"))(document.activeElement))
                ) {
                    const focusableElementsAll = pageEl.querySelectorAll(QUERY_ELEMENT);
                    const focusableElements = (shiftKey
                        ? [...focusableElementsAll].reverse()
                        : [...focusableElementsAll]
                    ).filter((el) => el.getAttribute("tabindex") !== "-1");

                    const element = isEdit
                        ? focusableElements.find(isActiveElement(pageEl.querySelector(".panel-editing-focus")))
                        : focusableElements[0];

                    if (element) {
                        element.focus();
                    }
                }
            });
        }
    };

    render() {
        const {pageStore, className, classes = {}, hidden, visible} = this.props;

        return (
            <div
                ref={this.handleSetPageEl}
                className={cn(classes.root, className)}
                tabIndex="0"
                onKeyDown={this.handleKeyDown}
            >
                <Scrollbars
                    style={SCROLLABRS_STYLE}
                    hideTracksWhenNotNeeded
                    withRequestAnimationFrame
                    contentProps={{
                        className: classes.rootPageContent,
                    }}
                    pageStore={pageStore}
                    verticalStyle={VERTICAL_STYLE}
                >
                    <div ref={pageStore.setPageInnerElAction}>
                        <PageLoader
                            pageStore={pageStore}
                            container={this.state.pageEl}
                            loaderType={pageStore.applicationStore.settingsStore.settings.projectLoader}
                        />
                        <BuilderForm onSubmit={this.handleSubmit} noForm pageStore={pageStore}>
                            <Grid container spacing={2} direction="column" wrap="nowrap">
                                {pageStore.isEdit ? <div className={classes.backdrop} /> : null}
                                <BuilderPageChildren
                                    readOnly={pageStore.isReadOnly}
                                    hidden={hidden}
                                    pageStore={pageStore}
                                    pageBc={pageStore.pageBc}
                                    visible={visible}
                                />
                            </Grid>
                        </BuilderForm>
                    </div>
                </Scrollbars>
                {pageStore.showQuestionWindow ? (
                    <WindowMessage
                        open
                        maxWidth="md"
                        onAccept={pageStore.handleQuestionAccept}
                        onDecline={pageStore.handleQuestionDecline}
                        pageStore={pageStore}
                        classes={{content: classes.rootDialogContent, rootDialogWidthMd: classes.rootDialogWidthMd}}
                        ckPageObject="builder-page-qustion-window"
                    >
                        <div>{pageStore.questionWindow ? prepareTip(pageStore.questionWindow) : ""}</div>
                        <div>Продолжить?</div>
                    </WindowMessage>
                ) : null}
                <PageWindows pageStore={pageStore} />
            </div>
        );
    }
}

export default compose(
    withStyles(style),
    observer,
)(BuilderPage);
