// @flow
import * as React from "react";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {type PageModelType} from "../stores/PageModel";
import {type RecordsModelType} from "../stores/RecordsModel";
import {type BuilderBaseType} from "../BuilderType";
import {checkAutoload} from "../utils/builder";

type ModelHOCProps<BCType> = {
    pageStore: PageModelType,
    bc: BCType,
    disabled?: boolean,
    hidden?: boolean,
};

type ModelType = {
    hidden: ?boolean,
    disabled: ?boolean,
    +recordsStore?: RecordsModelType,
};

// eslint-disable-next-line max-lines-per-function
function withModelDecorator<BCType: BuilderBaseType, Props: ModelHOCProps<BCType>, Model: ModelType>(
    createModel: (bc: BCType, props: Props) => Model,
    name: string = "store",
): (
    React.ComponentType<Props>,
) => React.ComponentType<$Diff<Props, {store: Model | void, isAutoLoad: boolean | void}>> {
    // eslint-disable-next-line max-lines-per-function
    return (WrappedComponent) => {
        class ModelHOC extends React.Component<Props, {store: ?Model, isAutoLoad: boolean, ckPageObject: string}> {
            static defaultProps = {
                bc: {},
            };

            state = {
                ckPageObject: "",
                isAutoLoad: false,
                store: null,
            };

            componentDidMount() {
                const {bc, pageStore} = this.props;
                const store: Model = createModel(bc, this.props);
                const {recordsStore} = store;
                const isAutoLoad = checkAutoload({bc, pageStore, recordsStore: store.recordsStore});
                /*
                 * TODO: fix CORE-1155
                 * $FlowFixMe
                 */
                const ckPageObject = store.bc ? store.bc[VAR_RECORD_PAGE_OBJECT_ID] : bc[VAR_RECORD_PAGE_OBJECT_ID];

                if (ckPageObject) {
                    // $FlowFixMe
                    this.props.pageStore.addStore(store, ckPageObject);
                }

                this.setState(
                    {
                        ckPageObject,
                        isAutoLoad,
                        store,
                    },
                    () => {
                        /*
                         * Дожидаемся did mount на внутренних компонентах.
                         * Поля могут сами инициировать начальную загрузку.
                         */
                        if (isAutoLoad && recordsStore && !recordsStore.isLoading) {
                            recordsStore.loadRecordsAction({status: "autoload"});
                        }
                    },
                );
            }

            componentDidUpdate() {
                const {store} = this.state;

                if (store) {
                    store.disabled = this.props.disabled;
                    store.hidden = this.props.hidden;
                }
            }

            componentWillUnmount() {
                const {ckPageObject} = this.state;

                if (ckPageObject) {
                    // $FlowFixMe
                    this.props.pageStore.removeStore(ckPageObject, this.state.store);
                }
            }

            render() {
                const {store} = this.state;
                const storeProps = {[name]: store};

                if (!store) {
                    return null;
                }

                return <WrappedComponent {...this.props} {...storeProps} isAutoLoad={this.state.isAutoLoad} />;
            }
        }

        return ModelHOC;
    };
}

export default withModelDecorator;
