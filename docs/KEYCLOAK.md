# Подключение keycloak авторизации

## 1. После регистрации Realm и Client в KeyCloak выгружаем настройки

![Alt text](image/keycloak-client-setting.png)

## 2. Добавлем в представление(добавлен по умолчанию в auth) или страницу класс

![Alt text](image/class-keycloak.png)

## 3. Регистрируем провайдер на шлюзе

![Alt text](image/keycloak-provider-setting-1.png)

### 3.1 Мапим доступы

![Alt text](image/keycloak-provider-setting-2.png "Мапим доступы")

### 3.2 Мапим данные пользователя

![Alt text](image/keycloak-provider-setting-3.png "Мапим данные пользователя")

## 4. Создаем пустой сервис и подключаем к кнопке, если не рекурсивный

![Alt text](image/keycloak-service.png)

## 5. Регистрируем admin для обратной связи keycloak

### 5.1 Добавляем location в nginx
```nginx
        location ~ "/keycloak/(.+)$" {
            proxy_pass http://gate:8080/api?jv_keycloak_path_callback=$1;
        }
```
### 5.2 Добавляем в настройки client KeyClock сервер

![Alt text](image/keycloak-client-setting-2.png)

