# Utilites to start/build/zip module for core application

## Special commands

1. `start` - run application for developments. This mode provide render component into web browser and script by url address `http://localhost:8080/{project-name}.js`. You can pass this url into `preference` of core application to inject module for development.
1. `build` - build application for prodaction.
1. `zip` - make zip archive to pass them into marketplace or share.


## Descibe schema manifest

You can pass classes as many as you need (array like style)

### class - Descrbe infomration about Class

|name|value|description|
|----|-----|-----------|
|cl_dataset|1,0|Indecate there should be ck_query for class|
|cl_final|1,0|Flag to show in the root of objects|
|cv_description|any sctring|Description of class|
|cv_name|any string|Short name of the class|
|cv_type|word characters with underscore|Type of the class. Will be in the `type` attribute for the class|

### attributes - create a new attribute (but not apply to the class, see below how to apply to the class)

### class_attributes - apply exising attributes to the class

### class_hierarchy

Can be `class_parent` and `class_child`
