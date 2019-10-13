/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/camelcase */

export const EXPEREMENTAL_BC = {
    ckParent: "root",
    ckPageObject: "application",
    type: "APPLICATION",
    cvUrl: "pages",
    hiddenrules: "!sess",
    redirecturl: "auth",
    defaultvalue: "home",
    childs: [
        {
            ckParent: "application",
            ckPageObject: "appbar",
            type: "APPBAR",
            description: "Может быть панель. Должна строить панель высотой 45 пикселей",
            childs: [
                {
                    ckParent: "appbar",
                    ckPageObject: "btn_favorite",
                    type: "BTN",
                    description: "Закладки",
                },
                {
                    ckParent: "appbar",
                    ckPageObject: "btn_menu_app",
                    type: "BTN",
                    description: "Меню приложения",
                },
                {
                    ckParent: "appbar",
                    ckPageObject: "open_page_tabs",
                    type: "OPEN_PAGE_TABS",
                    description: "Список котрытых вкладок",
                },
                {
                    ckParent: "appbar",
                    ckPageObject: "btn_notification",
                    type: "BTN",
                    description: "Нотификации",
                },
                {
                    ckParent: "appbar",
                    ckPageObject: "btn_menu_profile",
                    type: "BTN",
                    description: "Меню профиля. Внутри должны быть ограничения на доступность полей.",
                },
                {
                    ckParent: "appbar",
                    ckPageObject: "btn_about",
                    type: "BTN",
                    description: "О приложении",
                },
            ],
        },
        {
            ckParent: "application",
            ckPageObject: "pages",
            type: "PAGES",
            ckQuery: "MTRoute",
            defultvalue: "home",
            childs: [
                {
                    ckParent: "pages",
                    ckPageObject: "PAGER",
                    type: "PAGER",
                    description: "Виртуальный класс, служит для построения страниц из открытых роутов",
                },
            ],
        },
    ],
};
