import {
    IBuilderConfig,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_CN_ORDER,
    VAR_RECORD_QUERY_ID,
    FieldValue,
} from "@essence-community/constructor-share";

const COMBO_COLUMNS = [
    {
        [VAR_RECORD_ID]: 1,
        displayfield: "ID",
        valuefield: "ck_id",
    },
    {
        [VAR_RECORD_ID]: 2,
        displayfield: "Display",
        valuefield: "cv_display",
    },
    {
        [VAR_RECORD_ID]: 3,
        displayfield: "Name",
        valuefield: "cv_name",
    },
];

const TRUE_FALSE_RECORDS = [
    {
        [VAR_RECORD_ID]: 1,
        displayfield: "Да",
        valuefield: "true",
    },
    {
        [VAR_RECORD_ID]: 0,
        displayfield: "Нет",
        valuefield: "false",
    },
];

export function makePreviewChilds(objectId: string): IBuilderConfig[] {
    return [
        {
            [VAR_RECORD_CN_ORDER]: 10,
            [VAR_RECORD_DISPLAYED]: "Выпадающий список",
            [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-combo`,
            [VAR_RECORD_PARENT_ID]: "grid",
            [VAR_RECORD_QUERY_ID]: "DemoListForCombo",
            autoload: true,
            column: "combo",
            datatype: "combo",
            displayfield: "cv_display",
            type: "IFIELD",
            valuefield: "cv_name",
            width: "100%",
        },
        {
            [VAR_RECORD_CN_ORDER]: 20,
            [VAR_RECORD_DISPLAYED]: "Поле ввода",
            [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-text`,
            [VAR_RECORD_PARENT_ID]: "grid",
            column: "text",
            datatype: "text",
            maxsize: "120",
            required: true,
            type: "IFIELD",
        },
        {
            [VAR_RECORD_CN_ORDER]: 30,
            [VAR_RECORD_DISPLAYED]: "Кнопка",
            [VAR_RECORD_MASTER_ID]: objectId,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-btn`,
            [VAR_RECORD_PARENT_ID]: "grid",
            handler: "onSave",
            type: "BTN",
            uitype: "5",
        },
    ];
}

function makeWindowButtons(objectId: string): IBuilderConfig[] {
    return [
        {
            [VAR_RECORD_DISPLAYED]: "Сохранить",
            [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-save`,
            [VAR_RECORD_PARENT_ID]: objectId,
            handler: "onSimpleSaveWindow",
            type: "BTN",
        },
    ];
}

function makeComboWindow(masterId: string, gridId: string): IBuilderConfig {
    const objectId = `${gridId}-window-combo`;

    return {
        [VAR_RECORD_DISPLAYED]: "Редактировать 'Выпадающий список'",
        [VAR_RECORD_MASTER_ID]: masterId,
        [VAR_RECORD_PAGE_OBJECT_ID]: objectId,
        [VAR_RECORD_PARENT_ID]: gridId,
        bottombtn: makeWindowButtons(objectId),
        childs: [
            {
                [VAR_RECORD_DISPLAYED]: "Порядок",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-${VAR_RECORD_CN_ORDER}`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: VAR_RECORD_CN_ORDER,
                datatype: "integer",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Ширина поля. Целое число от 1% до 100%. Обязательно добавлять %.",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-width`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: "width",
                datatype: "text",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Наименование",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-${VAR_RECORD_DISPLAYED}`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: VAR_RECORD_DISPLAYED,
                datatype: "text",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Наименование параметра, который будет отображен",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-name`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: "displayfield",
                datatype: "combo",
                displayfield: "displayfield",
                records: COMBO_COLUMNS,
                type: "IFIELD",
                valuefield: "valuefield",
            },
            {
                [VAR_RECORD_DISPLAYED]:
                // eslint-disable-next-line max-len
                    "Наименование параметра из внутреннего сервиса, значение которого будет передано для дальнейшей обработки",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-name`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: "valuefield",
                datatype: "combo",
                displayfield: "displayfield",
                records: COMBO_COLUMNS,
                type: "IFIELD",
                valuefield: "valuefield",
            },
        ],
        ckwindow: "combowindow",
        type: "WIN",
        wintype: "fullscreen",
    };
}

function makeTextWindow(masterId: string, gridId: string): IBuilderConfig {
    const objectId = `${gridId}-window-text`;

    return {
        [VAR_RECORD_DISPLAYED]: "Редактировать 'Поле ввода'",
        [VAR_RECORD_MASTER_ID]: masterId,
        [VAR_RECORD_PAGE_OBJECT_ID]: objectId,
        [VAR_RECORD_PARENT_ID]: gridId,
        bottombtn: makeWindowButtons(objectId),
        childs: [
            {
                [VAR_RECORD_DISPLAYED]: "Признак обязательности заполнения",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-required`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: "required",
                datatype: "combo",
                displayfield: "displayfield",
                records: TRUE_FALSE_RECORDS,
                type: "IFIELD",
                valuefield: "valuefield",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Порядок",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-${VAR_RECORD_CN_ORDER}`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: VAR_RECORD_CN_ORDER,
                datatype: "integer",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Максимальное количество символов",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-maxsize`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: "maxsize",
                datatype: "integer",
                required: true,
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Маска ввода, например (999) 999-99-99",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-imask`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: "imask",
                datatype: "text",
                type: "IFIELD",
            },
        ],
        ckwindow: "textwindow",
        type: "WIN",
        wintype: "fullscreen",
    };
}

function makeBtnWindow(masterId: string, gridId: string): IBuilderConfig {
    const objectId = `${gridId}-window-btn`;
    const iconfontId = `${objectId}-iconfont`;

    return {
        [VAR_RECORD_DISPLAYED]: "Редактировать 'Выпадающий список'",
        [VAR_RECORD_MASTER_ID]: masterId,
        [VAR_RECORD_PAGE_OBJECT_ID]: objectId,
        [VAR_RECORD_PARENT_ID]: gridId,
        bottombtn: makeWindowButtons(objectId),
        childs: [
            {
                [VAR_RECORD_DISPLAYED]: "Наименование",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-${VAR_RECORD_DISPLAYED}`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: VAR_RECORD_DISPLAYED,
                datatype: "text",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Порядок",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-${VAR_RECORD_CN_ORDER}`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: VAR_RECORD_CN_ORDER,
                datatype: "integer",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Тип вида кнопки: 1-primary 2-secondary	",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-uitype`,
                [VAR_RECORD_PARENT_ID]: objectId,
                column: "uitype",
                datatype: "text",
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: "Иконка (например, fa-plus)	",
                [VAR_RECORD_PAGE_OBJECT_ID]: iconfontId,
                [VAR_RECORD_PARENT_ID]: objectId,
                [VAR_RECORD_QUERY_ID]: "MTIcon",
                autoload: true,
                btnrefresh: true,
                column: "iconfont",
                columns: [
                    {
                        [VAR_RECORD_PAGE_OBJECT_ID]: `${iconfontId}-icon`,
                        [VAR_RECORD_PARENT_ID]: iconfontId,
                        datatype: "icon",
                        dynamicicon: true,
                        iconfont: "cv_name",
                        iconfontname: ("cv_font" as unknown) as "fa" | "mdi",
                        type: "COLUMN",
                        visible: true,
                    },
                    {
                        [VAR_RECORD_PAGE_OBJECT_ID]: `${iconfontId}-name`,
                        [VAR_RECORD_PARENT_ID]: iconfontId,
                        column: "cv_name",
                        datatype: "text",
                        type: "COLUMN",
                        visible: true,
                    },
                ],
                datatype: "grid",
                displayfield: "cv_name",
                orderproperty: "1",
                type: "IFIELD",
                valuefield: "cv_name",
            },
        ],
        ckwindow: "btnwindow",
        type: "WIN",
        wintype: "fullscreen",
    };
}

function makeGrid(objectId: string): IBuilderConfig {
    const gridId = `${objectId}-grid`;

    return {
        [VAR_RECORD_PAGE_OBJECT_ID]: gridId,
        [VAR_RECORD_PARENT_ID]: `${objectId}-panel`,
        childwindow: [
            makeComboWindow(objectId, gridId),
            makeTextWindow(objectId, gridId),
            makeBtnWindow(objectId, gridId),
        ],
        columns: [
            {
                [VAR_RECORD_DISPLAYED]: "Редактировать",
                [VAR_RECORD_PAGE_OBJECT_ID]: "${gridId}-column-edit",
                [VAR_RECORD_PARENT_ID]: gridId,
                ckwindow:
                    // eslint-disable-next-line quotes, max-len
                    '{"IFIELDcombo": "combowindow", "IFIELDtext": "textwindow", "BTN": "btnwindow"}[type + (datatype || "")]',
                datatype: "icon",
                iconfont: "edit",
                mode: "2",
                tipmsg: "Редактировать значение",
                type: "COLUMN",
                visible: true,
            },
            {
                [VAR_RECORD_DISPLAYED]: "Наименование",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${gridId}-column-name`,
                [VAR_RECORD_PARENT_ID]: gridId,
                column: VAR_RECORD_DISPLAYED,
                datatype: "text",
                type: "COLUMN",
                visible: true,
            },
            {
                [VAR_RECORD_DISPLAYED]: "Порядок",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${gridId}-column-щквук`,
                [VAR_RECORD_PARENT_ID]: gridId,
                column: VAR_RECORD_CN_ORDER,
                datatype: "integer",
                type: "COLUMN",
                visible: true,
            },
        ],
        edittype: "modalwindow",
        hideactions: true,
        idproperty: VAR_RECORD_PAGE_OBJECT_ID,
        orderproperty: VAR_RECORD_DISPLAYED,
        records: (makePreviewChilds(objectId) as unknown) as Record<string, FieldValue>[],
        splitter: true,
        topbtn: [
            {
                [VAR_RECORD_DISPLAYED]: "Редактировать",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${gridId}-edit`,
                [VAR_RECORD_PARENT_ID]: gridId,
                disabledemptymaster: true,
                type: "BTN",
            },
        ],
        type: "GRID",
    };
}

function makeDemoPreview(masterId: string, objectId: string, newChilds: IBuilderConfig[]): IBuilderConfig {
    return {
        [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-preview`,
        [VAR_RECORD_PARENT_ID]: objectId,
        childs: [
            ...newChilds,
            {
                [VAR_RECORD_MASTER_ID]: masterId,
                [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-demo-preview`,
                [VAR_RECORD_PARENT_ID]: `${objectId}-preview`,
                type: "PROMO_PREIVEW",
            },
        ],
        contentview: "vbox",
        type: "FORMPANEL",
    };
}

export function makeChilds(bc: IBuilderConfig, newChilds: IBuilderConfig[]): IBuilderConfig[] {
    const objectId = bc[VAR_RECORD_PAGE_OBJECT_ID];

    return [
        {
            [VAR_RECORD_PAGE_OBJECT_ID]: `${objectId}-panel`,
            [VAR_RECORD_PARENT_ID]: objectId,
            childs: [makeGrid(objectId), makeDemoPreview(objectId, `${objectId}-panel`, newChilds)],
            contentview: "hbox",
            type: "PANEL",
        },
    ];
}
