import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence-community/constructor-share/constants";
import {IBuilderConfig} from "@essence-community/constructor-share/types";

function makeLeftPanel(objectId: string): IBuilderConfig {
    const objectSelfId = `${objectId}-left`;

    return {
        [VAR_RECORD_PAGE_OBJECT_ID]: objectSelfId,
        [VAR_RECORD_PARENT_ID]: objectId,
        childs: [
            {
                [VAR_RECORD_DISPLAYED]: "Field DisabledRules",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectSelfId}-disabledrules`,
                [VAR_RECORD_PARENT_ID]: objectSelfId,
                datatype: "text",
                getglobal: "gv_disabledrules",
                maxsize: "120",
                setglobal: "gv_disabledrules",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Field HiddenRules",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectSelfId}-hiddenrules`,
                [VAR_RECORD_PARENT_ID]: objectSelfId,
                datatype: "text",
                getglobal: "gv_hiddenrules",
                maxsize: "120",
                required: false,
                setglobal: "gv_hiddenrules",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Field RequiredRules",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectSelfId}-requiredrules`,
                [VAR_RECORD_PARENT_ID]: objectSelfId,
                datatype: "text",
                getglobal: "gv_requiredrules",
                maxsize: "120",
                setglobal: "gv_requiredrules",
                type: "IFIELD",
            },
        ],
        datatype: "group",
        type: "IFIELD",
    };
}

function makeRightPanel(objectId: string): IBuilderConfig {
    const objectSelfId = `${objectId}-left`;

    return {
        [VAR_RECORD_PAGE_OBJECT_ID]: objectSelfId,
        [VAR_RECORD_PARENT_ID]: objectId,
        childs: [
            {
                [VAR_RECORD_DISPLAYED]: "Заблокировать",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectSelfId}-disabled`,
                [VAR_RECORD_PARENT_ID]: objectSelfId,
                column: "disabled",
                datatype: "checkbox",
                getglobal: "gc_disabled",
                setglobal: "gc_disabled",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Скрыть",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectSelfId}-hidden`,
                [VAR_RECORD_PARENT_ID]: objectSelfId,
                column: "hidden",
                datatype: "checkbox",
                getglobal: "gc_hidden",
                setglobal: "gc_hidden",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Включить обязательное заполнение",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectSelfId}-required`,
                [VAR_RECORD_PARENT_ID]: objectSelfId,
                column: "required",
                datatype: "checkbox",
                getglobal: "gc_required",
                setglobal: "gc_required",
                type: "IFIELD",
            },
        ],
        column: "gorup",
        datatype: "group",
        type: "IFIELD",
    };
}

export function makeChildsBehavior(bc: IBuilderConfig): IBuilderConfig[] {
    const objectId = bc[VAR_RECORD_PAGE_OBJECT_ID];
    const objectSelfId = `${objectId}-panel`;

    return [
        {
            [VAR_RECORD_PAGE_OBJECT_ID]: objectSelfId,
            [VAR_RECORD_PARENT_ID]: objectId,
            childs: [
                // TODO: remove in 2.6 release
                {
                    [VAR_RECORD_PAGE_OBJECT_ID]: `${objectSelfId}-inputs`,
                    [VAR_RECORD_PARENT_ID]: objectSelfId,
                    childs: [makeLeftPanel(objectSelfId)],
                    hidden: true,
                    type: "PANEL",
                },
                {
                    [VAR_RECORD_PAGE_OBJECT_ID]: `${objectSelfId}-result`,
                    [VAR_RECORD_PARENT_ID]: objectSelfId,
                    childs: [
                        makeRightPanel(`${objectSelfId}-result`),
                        {
                            [VAR_RECORD_PAGE_OBJECT_ID]: `${objectSelfId}-result-emptyspace`,
                            [VAR_RECORD_PARENT_ID]: `${objectSelfId}-result`,
                            height: "8px",
                            type: "EMPTY_SPACE",
                        },
                        {
                            [VAR_RECORD_DISPLAYED]: "Исследуемое поле",
                            [VAR_RECORD_PAGE_OBJECT_ID]: `${objectSelfId}-result-text`,
                            [VAR_RECORD_PARENT_ID]: `${objectSelfId}-result`,
                            disabledrules: "gc_disabled",
                            hiddenrules: "gc_hidden",
                            requiredrules: "gc_required",
                            type: "PROMO_BEHAVIOR_TEXT",
                        },
                    ],
                    contentview: "vbox",
                    type: "PANEL",
                },
            ],
            contentview: "hbox",
            type: "PANEL",
        },
    ];
}
