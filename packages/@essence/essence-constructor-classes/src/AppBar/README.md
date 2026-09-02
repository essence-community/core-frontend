# AppBar (`APP_BAR`)

Навигационная панель на базе MUI [`AppBar`](https://mui.com/material-ui/react-app-bar/).

```ts
setComponent("APP_BAR", commonDecorator(AppBar));
```

Дети раскладываются через `mapComponents`. Цвет панели — атрибут `uitype`:

| uitype | MUI `color` |
|---|---|
| `1` | `primary` |
| `2` | `secondary` |
| `3` | `default` |
| `4` | `inherit` |

Высота/ширина берутся из `bc.height`, `maxheight`, `minheight`, `bc.width`.
