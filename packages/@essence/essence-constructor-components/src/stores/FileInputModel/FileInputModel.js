/*
 * TODO: Переделать удаление и загрузку, нужно перенести в рекордс или реквест
 * @flow
 */
import {action, extendObservable} from "mobx";
import mime from "mime";
import {fileTypeValidate, fileSizeValidate} from "@essence/essence-constructor-share/utils";
import {type ButtonConfigType} from "../ButtonModel";
import {StoreBaseModel} from "../StoreBaseModel";
import {
    type FileInputCallBackType,
    type FileInputChooseAwaitType,
    type FileInputConstructorType,
    type FileInputModelType,
} from "./FileInputModelType";

const TERABYTE = 1099511627776;
const GIGABYTE = 1073741824;
const MEGABYTE = 1048576;
const KILOBYTE = 1024;

const fileSizeText = (size: number) => {
    if (size > TERABYTE) {
        return `${(size / TERABYTE).toFixed(0)} тб`;
    }
    if (size > GIGABYTE) {
        return `${(size / GIGABYTE).toFixed(0)} гб`;
    }
    if (size > MEGABYTE) {
        return `${(size / MEGABYTE).toFixed(0)} мб`;
    }
    if (size > KILOBYTE) {
        return `${(size / KILOBYTE).toFixed(0)} кб`;
    }

    return `${size} байт`;
};

export class FileInputModel extends StoreBaseModel implements FileInputModelType {
    bc: ButtonConfigType;

    fileChooseAwait: ?FileInputChooseAwaitType;

    fileTypes: Array<string>;

    constructor({pageStore, bc}: FileInputConstructorType) {
        super({bc, pageStore});

        extendObservable(
            this,
            {
                fileChooseAwait: null,
            },
            null,
            {deep: false},
        );

        this.fileTypes = this.bc.filetypes
            ? this.bc.filetypes
                  .split(",")
                  .map((ext) => mime.getType(ext.trim()))
                  .reduce((obj, value) => {
                      obj.push(value);
                      if (value === "application/zip") {
                          obj.push("application/x-zip-compressed");
                      }

                      return obj;
                  }, [])
            : [
                  "application/pdf",
                  "application/zip",
                  "application/x-zip-compressed",
                  "application/vnd.ms-excel",
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  "application/vnd.oasis.opendocument.text",
                  "application/vnd.oasis.opendocument.spreadsheet",
                  "text/plain",
              ];
    }

    deleteFileChooseAwait = action("deleteFileChooseAwait", () => {
        this.fileChooseAwait = null;
    });

    initFileChooseAwait = action("initFileChooseAwait", (callBack: FileInputCallBackType) => {
        this.fileChooseAwait = (files: File[]) => {
            const isValid = files.every((file) => this.validateFile(file));

            if (isValid) {
                callBack(files);
            }

            this.deleteFileChooseAwait();
        };
    });

    validateFile = (file: File): boolean => {
        const {applicationStore} = this.pageStore;
        let success = true;

        if (!fileSizeValidate(file, this.bc.maxfile)) {
            success = false;
            applicationStore.snackbarStore.snackbarOpenAction(
                {
                    status: "error",
                    text:
                        "Превышен максимальный допустимый размер для загружаемого файла." +
                        ` Разрешены файлы размером не более ${fileSizeText(
                            parseInt(this.bc.maxfile || "5242880", 10),
                        )}`,
                },
                this.pageStore.route,
            );
        }
        if (!fileTypeValidate(file, this.fileTypes)) {
            success = false;
            applicationStore.snackbarStore.snackbarOpenAction(
                {
                    status: "error",
                    text:
                        "Данный формат файлов не поддерживается." +
                        `Разрешены форматы: ${
                            this.bc.filetypes ? this.bc.filetypes : "doc, docx, pdf, zip, txt, ods, odt, xls, xlsx"
                        }`,
                },
                this.pageStore.route,
            );
        }

        return success;
    };
}
