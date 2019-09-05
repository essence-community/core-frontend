# Переход на платформу из вне

Для перехода предусмотрена отдельная страница `redirect`, для передачи данных нужно воспользоваться:

```javascript
encodeURIComponent(btoa(unescape(encodeURIComponent(str))))
```

где:

1. `str` - строка, которая может быть преобразована через `JSON.stringify`

## Формат строки

1. `page` - aдрес страницы на которую необходимо делать переход. Задается по принципу атрибута `redirecturl`
2. `filter` - задает передаваемые данные на страницу. Могут применяться как стандартные поля ввода (`column`) так и глобальные переменные.

## Примеры

### Переход на страницу организации

Исходный набор данных:


```javascript
{
    "page": "61",
    "filter": {
        "cv_short": '"Великолепный мир", ООО',
        "cv_internal": "Великолепный мир1",
        "cv_inn": 7719813657,
        "cv_kpp": 452635580,
    },
}
```

Полученная строка: `eyJwYWdlIjo2MSwiZmlsdGVyIjp7ImN2X3Nob3J0IjoiXCLQktC10LvQuNC60L7Qu9C10L%2FQvdGL0Lkg0LzQuNGAXCIsINCe0J7QniIsImN2X2ludGVybmFsIjoi0JLQtdC70LjQutC%2B0LvQtdC%2F0L3Ri9C5INC80LjRgDEiLCJjdl9pbm4iOjc3MTk4MTM2NTcsImN2X2twcCI6NDUyNjM1NTgwfX0%3D`

Относильная ссылка `/redirect/eyJwYWdlIjo2MSwiZmlsdGVyIjp7ImN2X3Nob3J0IjoiXCLQktC10LvQuNC60L7Qu9C10L%2FQvdGL0Lkg0LzQuNGAXCIsINCe0J7QniIsImN2X2ludGVybmFsIjoi0JLQtdC70LjQutC%2B0LvQtdC%2F0L3Ri9C5INC80LjRgDEiLCJjdl9pbm4iOjc3MTk4MTM2NTcsImN2X2twcCI6NDUyNjM1NTgwfX0%3D`
