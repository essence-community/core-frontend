import {IHandlers, HandlerType} from "@essence-community/constructor-share/types";
import {StoreBaseModel} from "@essence-community/constructor-share/models";
import {IField} from "@essence-community/constructor-share/Form";
import {action} from "mobx";
import {IFieldRepeaterModelProps} from "./FieldRepeaterModel.types";

/**
 * @exports FieldRepeaterModel
 */
export class FieldRepeaterModel extends StoreBaseModel {
    field: IField;

    constructor({field, ...otherProps}: IFieldRepeaterModelProps) {
        super(otherProps);

        this.field = field;
    }

    handleAdd: HandlerType = () => {
        this.field.add();

        return Promise.resolve(true);
    };

    handleDel: HandlerType = (_mode, btnBc) => {
        this.field.del(btnBc.defaultvalue);

        return Promise.resolve(true);
    };

    @action
    setField = (field: IField) => {
        this.field = field;
    };

    /**
     * @memberof FieldRepeaterModel
     * @member
     */
    handlers: IHandlers = {
        /**
         * Add a new block with child fields
         * @memberof FieldRepeaterModel.handlers
         * @instance
         */
        onAdd: this.handleAdd,
        /**
         * Remove the block with child fields
         * @memberof FieldRepeaterModel.handlers
         * @instance
         */
        onDel: this.handleDel,
    };
}
