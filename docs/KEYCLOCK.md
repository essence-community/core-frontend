# Подключение keyclock авторизации

## 1. После регистрации Realm и Client в KeyClock выгружаем настройки

![Alt text](image/keyclock-client-setting.png)

## 2. Добавлем в представление(добавлен по умолчанию в auth) или страницу класс

![Alt text](image/class-keyclock.png)

## 3. Регистрируем провайдер на шлюзе

![Alt text](image/keyclock-provider-setting-1.png)

### 3.1 Мапим доступы

![Alt text](image/keyclock-provider-setting-2.png "Мапим доступы")

### 3.2 Мапим данные пользователя

![Alt text](image/keyclock-provider-setting-3.png "Мапим данные пользователя")

## 4. Регистрируем admin для обратной связи keyclock

### 4.1 Добавляем location в nginx
```nginx
        location ~ "/keyclock/(.+)$" {
            proxy_pass http://gate:8080/api?jv_keyclock_path_callback=$1;
        }
```
### 4.2 Добавляем в настройки client KeyClock сервер

![Alt text](image/keyclock-client-setting-2.png)
