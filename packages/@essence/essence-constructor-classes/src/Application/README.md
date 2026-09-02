# Application (`APPLICATION`)

Корневой класс приложения. Без `commonDecorator`.

```ts
setComponent("APPLICATION", ApplicationContainer);
```

Хост рендерит его из `ApplicationRouter` с фиктивным `bc: { type: "APPLICATION" }`. Как выбрать активное приложение по URL — [APPLICATION.md](../../../../../docs/APPLICATION.md).

## ApplicationContainer

Поднимает `ApplicationModel`, тему, snackbar, блок-оверлей, websocket и дочерние объекты `bc` через `mapComponents`.

## ApplicationModel

- auth (`AuthModel`: login / session / logout)
- вкладки страниц (`PagesModel`)
- маршруты (`RoutesModel`, query `MTRoute`)
- конфиг приложения (`MTApplicationRoute`, `activerules`)
- `globalValues` и `g_sess_*` из сессии
- WebSocket: `notification`, `mask`, `reloaduser`, `reloadpageobject`, `localization`

### handlers

| Handler | Действие |
|---|---|
| `onLogout` | выход, закрытие WS, редирект на auth URL |
| `onWindowOpen` | открыть окно по `ckwindow` |
