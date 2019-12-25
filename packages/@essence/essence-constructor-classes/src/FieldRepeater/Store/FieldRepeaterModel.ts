import {IHandlers, HandlerType} from "@essence/essence-constructor-share/types";
import {Field} from "@essence/essence-constructor-share/types/Base";
import {StoreBaseModel} from "@essence/essence-constructor-share/models";
import {IFieldRepeaterModelProps} from "./FieldRepeaterModel.types";

/**
 * @exports FieldRepeaterModel
 */
export class FieldRepeaterModel extends StoreBaseModel {
    field: Field;

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
