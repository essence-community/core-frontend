import * as React from "react";
import cn from "classnames";
import {useObserver} from "mobx-react-lite";
import {
    Scrollbars,
    mapComponents,
    IClassProps,
    IBuilderConfig,
    PageLoader,
    ApplicationContext,
} from "@essence/essence-constructor-share";
import {settingsStore} from "@essence/essence-constructor-share/models";
import {PagerWindows} from "../components/PagerWindows";
import {focusPageElement} from "../utils/focusPageElement";
import {PagerWindowMessage} from "../components/PagerWindowMessage";
import {useStyles} from "./PagerContainer.styles";

const VERTICAL_STYLE = {zIndex: 3};
const SCROLLABRS_STYLE = {height: "100%", paddingRight: 10, width: "100%"};

interface IPagerProps extends IClassProps {}

export const PagerContainer: React.FC<IPagerProps> = (props) => {
    const {pageStore} = props;
    const classes = useStyles(props);
    const applicationStore = React.useContext(ApplicationContext);

    // TODO: need to ferify it
    React.useEffect(
        () => {
            if (!pageStore.route.clMenu) {
                setTimeout(() => {
                    if (applicationStore) {
                        applicationStore.pagesStore.removePageAction(pageStore.ckPage);
                    }
                });
            }
        },
        [applicationStore, pageStore.ckPage, pageStore.route.clMenu],
    );

    React.useEffect(
        () => {
            return () => {
                pageStore.setPageElAction(null);
                pageStore.setPageInnerElAction(null);
            };
        },
        [pageStore],
    );

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        focusPageElement(event, pageStore);
    };

    return useObserver(() => (
        <div
            ref={pageStore.setPageElAction}
            className={cn(classes.root, {[classes.hidden]: !pageStore.visible})}
            tabIndex={0}
            onKeyDown={handleKeyDown}
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
                    {pageStore.isEdit ? <div className={classes.backdrop} /> : null}
                    <PageLoader
                        pageStore={pageStore}
                        container={pageStore.pageEl}
                        // @ts-ignore
                        loaderType={settingsStore.settings.projectLoader}
                    />
                    {mapComponents(
                        [
                            {
                                childs: pageStore.pageBc,
                                ckPageObject: "FORMPANEL",
                                ckParent: "PAGER",
                                type: "FORMPANEL",
                            },
                        ],
                        (ChildComponent: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                            <ChildComponent
                                readOnly={pageStore.isReadOnly}
                                pageStore={pageStore}
                                bc={childBc}
                                visible={pageStore.visible}
                            />
                        ),
                    )}
                </div>
            </Scrollbars>
            <PagerWindowMessage pageStore={pageStore} />
            <PagerWindows pageStore={pageStore} />
        </div>
    ));
};
