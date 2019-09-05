
## FLow типизация

### Примеры работы с withStyles

Для добавления типов стилей для объекта styles

```js
const styles = {
  root: {color: 'red'}
};

type PropsType = {
  [$Keys<typeof styles>]: string
};
```

Для добавления типов стилей для функции styles

```js
const styles = (theme: any) => ({
    root: {
        height: theme.sizing.appbarHeight,
    },
});

type PropsType = {
  [$Keys<$Call<typeof styles>>]: string
};
```
