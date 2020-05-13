import * as React from "react";
import {IBuilderConfig, IPageModel, IRecordsModel} from "../types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "../constants";
import {checkAutoload} from "./utils";

export interface IWithModelProps {
    pageStore: IPageModel;
    bc: IBuilderConfig;
    disabled?: boolean;
    hidden?: boolean;
}

export interface ICreateModelProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
}

interface IModelType {
    hidden?: boolean;
    disabled?: boolean;
    recordsStore: IRecordsModel;
}
interface IState<Model> {
    store?: Model;
    isAutoLoad: boolean;
}

export const withModel = <Model extends IModelType, P extends IWithModelProps>(
    createModel: (props: ICreateModelProps) => Model,
    name = "store",
) => (WrappedComponent: React.ComponentType<P>) =>
    class ModelHOC extends React.Component<P, IState<Model>> {
        public state: IState<Model> = {
            isAutoLoad: false,
            store: undefined,
        };

        public componentDidMount() {
            const {bc, pageStore} = this.props;
            const store: Model = createModel({bc, pageStore});
            const {recordsStore} = store;
            const isAutoLoad = checkAutoload({bc, pageStore});

            if (bc[VAR_RECORD_PAGE_OBJECT_ID]) {
                // @ts-ignore
                this.props.pageStore.addStore(store, bc[VAR_RECORD_PAGE_OBJECT_ID]);
            }

            this.setState(
                {
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

        public componentDidUpdate() {
            const {store} = this.state;

            if (store) {
                store.disabled = this.props.disabled;
                store.hidden = this.props.hidden;
            }
        }

        public componentWillUnmount() {
            if (this.props.bc[VAR_RECORD_PAGE_OBJECT_ID]) {
                // @ts-ignore
                this.props.pageStore.removeStore(this.props.bc[VAR_RECORD_PAGE_OBJECT_ID], this.state.store);
            }
        }

        public render() {
            const {store} = this.state;
            const storeProps = {[name]: store};

            if (!store) {
                return null;
            }

            // eslint-disable-next-line prettier/prettier
            return <WrappedComponent {...(this.props as P)} {...storeProps} isAutoLoad={this.state.isAutoLoad} />;
        }
    };
