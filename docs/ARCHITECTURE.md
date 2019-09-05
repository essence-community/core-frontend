# Архитектура проекта


## Принцип построение информации о глобальных переменных

## Принцип построения форм для отображения

## mode - для управления методами среди модулей

Соответвие mode в зависимости от типа:

- `1` - Создание
- `2` - Редактирование
- `3` - Удаление
- `4` - Действие настраивается пользователем
- `6` - Клонирование
- `8` - Загрузка файлов

## handler - служит для вызова соответвующего экшена в мождели

- `onCreateChildWindowMaster` - для вызова окна при создании
- `onRowCreateChildWindowMaster` - для вызова окна при редактировании
- `onSimpleSaveWindow` - сохранение данных по кнопке для модального окна
- `onCloseWindow` - закрытие модального окна
- `onCloseWindowSilent` - закрытие модального окна без сообщения
- `onPrintHandleOnline` - Онлайн печать
- `onPrintHandleOffline` - Отложенная печать

Обрабочики, которые не вошли в описание:

- `onPrintExcel` - Печать
- `addFileAction` - Кнопка добавления документа
- `deleteAction` - Удалить
- `removeSelectedRecordAction` - удаление
- `addAction` - Добавить
- `cloneAction` - Клонировать
- `removeRecordAction` - Удалить
- `loadRecordsAction` - зугрузить
- `editAction` - Редактировать
- `setNextRecord` - Предыдущая запись
- `setPrevRecord` - Следующая запись
- `onSimpleSave` - Сохранить
- `onRefresh` - Обновить
- `onOpenWindow` - Настройки
- `onPrint` - Печать
- `onSaveSettings` - Сохранить настройки
- `onCreateChildWindowMaster` - Печать в excel
- `onSimpleSaveWindow` - Добавить файл
- `onSimpleSaveWindow` - Сохранить
- `onCloseWindow` - Отмена

getBtnRefreshConfig - нужно переделать механизм, убрать handler функцией
