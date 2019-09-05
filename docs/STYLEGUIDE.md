# Принцип написание кода

## import / export 

1. import типов необходимо писать в формате `import {Button, type ButtonType} from "./Button"` . Объявление type должно быть внутри фигурных скобок
1. `export default` пишим только для компонентов классов, при это для самого класса добавляем `Base`, например для `Button` класс должен быть назван `ButtonBase`. Пример: `export class ButtonBase extends React.Component {`.

## Описание наполнения файлов

Пример рассматривается на компоненты Button и модели ButtonModel

1. Каждый компонент или модель должна находится в папке. Разрашается не выносить в отдельную папку компонент, который состоит только из одного файла.
1. Создаем папку `Button` (компонент) в нее помещаем `Button.jsx` и папку `ButtonStyles` для файлов стилей если такие необходимы.
1. В `Button` создаем отдельно `index.js` который должен делать `export` только главное компонента, пример содержимого `index.js`: `import Button from "./Button"; export default Button;`
1. Создаем папку `ButtonModel` в `store` (модель) в нее помещаем `ButtonModel.js`, `ButtonModelType.js`. В `ButtonModelType.js` описываем типы. В `ButtonModel.js` описываем логику.
1. Создаем в папке `ButtonModel` файл `index.js` в котором далем export типов и классов, следующим образом

```js
// @flow
export {Button} from "./Button";

// Type
export type {ButtonType} from "./ButtonType";
```

## Страктура папок

### Для компонентов

```
- Button
    - __tests__
        - Button.test.jsx
    - ButtonStyles
        - ButtonDarkStyles.js
        - ButtonLightStyles.js
        - ButtonStyles.js
        - index.js
    - Button.jsx
    - ButtonType.js
    - index.js
```

### Для моделей

```
- stores
    - ButtonModel
        - ButtonModel.js
        - BunttonModelType.js
        - index.js
```
