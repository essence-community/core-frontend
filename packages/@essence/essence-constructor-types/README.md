# Core types for constructor

Common types of the builder

You can find this:

## 1. Application

Root type of the application

## 2. AuthModel

Type for declare auth model with functions to login/logout

## 3. Builder

Main types for basic attributes

## 4. Class

Common props type for all components in the system

## 5. Form

Register Form&Field models to reuse them in the fields. \
This will provide common communication layer to platform

## 6. GlobalRecordsModel

We are using them to declare global stores which will be loaded while starting application


## 7. Module

Schema declaration for module. \
Should use to write custom components in modules.

## 8. PageModel

Common interface to work with current page. \
This model will provide through props in components.

## 9. PagesModel

Common interface to work with all opened pages. \
This model can provide functions to open/close page and get active page.

## 10. RecordsModel

Interface to make request into server. \
This interface should use to make custom request model for other api protocol.

## 11. RoutesModel

Interface which declare information about allowed pages and favorites.

## 12. StoreBaseModel

Common interface to implement custom store for self components.
