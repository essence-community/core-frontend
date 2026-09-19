# Тесты

Jest + `@testing-library/react` + jsdom. Enzyme нет.

```bash
yarn test
yarn test --coverage
CI=true yarn test
```

Хелперы: `getBaseBc`, `Renderer`, `createEmptyPageStore` из `@essence-community/constructor-share/utils/test`.

Покрытие: `coverage/lcov-report/index.html` после `yarn test --coverage`.

Пример: `packages/@essence/essence-constructor-classes/src/Button/__tests__/ButtonContainer.tsx`.
