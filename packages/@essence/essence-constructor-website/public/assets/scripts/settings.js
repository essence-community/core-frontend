/* eslint-disable camelcase, sort-keys, quotes, max-len*/
window.SETTINGS = [
    {
        ck_id: "core_gate_version",
        cv_description: "Версия шлюза",
        cv_value: "2.2.0 (mock)",
    },
    {ck_id: "project_profile_page", cv_value: "1875398035771", cv_description: "ИД страницы-профиля"},
    {
        ck_id: "core_db_patch",
        cv_value: null,
        cv_description:
            "Если стенд был пропатчен промежуточным патчем БД CORE (вне основного релиза) - в этом поле нужно указать подробности (хэш коммита или номер тикета)",
    },
    {ck_id: "project_db_major_version", cv_value: null, cv_description: "## НАСТРОЙ МЕНЯ ## Версия релиза БД проекта"},
    {
        ck_id: "project_db_deployment_date",
        cv_value: null,
        cv_description: "## НАСТРОЙ МЕНЯ ## Дата последнего деплоймента БД проектной сборки",
    },
    {
        ck_id: "project_db_commit",
        cv_value: null,
        cv_description: "## НАСТРОЙ МЕНЯ ## Хэш коммита, по которому собрана установленная проектная сборка БД",
    },
    {
        ck_id: "project_db_patch",
        cv_value: null,
        cv_description:
            "## НАСТРОЙ МЕНЯ ## Если стенд был пропатчен промежуточным проектным патчем БД (вне основного релиза) - в этом поле нужно указать подробности (хэш коммита или номер тикета)",
    },
    {
        ck_id: "instance_name",
        cv_value: "/",
        cv_description: "Имя экземпляра (по-хорошему, должно совпадать с именем в ссылке на стенд)",
    },
    {ck_id: "project_about_box_title", cv_value: "CORE", cv_description: 'Заголовок окна "О программе"'},
    {ck_id: "project_auth_title", cv_value: "Технологическая платформа", cv_description: "Заголовок окна авторизации"},
    {
        ck_id: "project_name",
        cv_value: "Технологическая платформа",
        cv_description: "Имя проекта (например, акроним из JIRA)",
    },
    {ck_id: "module_available", cv_value: "false", cv_description: "Включение загрузки всех модулей"},
    {ck_id: "project_about_box_footer", cv_value: "", cv_description: 'Футер окна "О программе"'},
    {ck_id: "project_about_box_description", cv_value: "", cv_description: 'Содержимое окна "О программе"'},
    {ck_id: "project_loader", cv_value: "default", cv_description: "Вид анимации лоадера"},
    {ck_id: "smart_mask_query", cv_value: null, cv_description: "Наименование запроса для инициализации массок"},
    {
        ck_id: "core_db_commit",
        cv_value: null,
        cv_description: "Хэш коммита, по которому собрана установленная сборка БД CORE",
    },
    {ck_id: "core_db_major_version", cv_value: "2.2.0", cv_description: "Версия релиза БД CORE"},
    {
        ck_id: "core_db_deployment_date",
        cv_value: null,
        cv_description:
            "Дата последнего деплоймента техплатформы (т.е. когда последний раз на этом стенде обновляли БД CORE)",
    },
    {
        ck_id: "g_sys_module_url",
        cv_value: "/api_module",
        cv_description: "Контекст получения модулей",
    },
];
