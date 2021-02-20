import mime from "mime";
import {fileTypeValidate, fileSizeValidate, i18next} from "@essence-community/constructor-share/utils";
import {snackbarStore, StoreBaseModel} from "@essence-community/constructor-share/models";
import {IStoreBaseModelProps} from "@essence-community/constructor-share/types";
import {IField} from "@essence-community/constructor-share/Form/types";

const TERABYTE = 1099511627776;
const GIGABYTE = 1073741824;
const MEGABYTE = 1048576;
const KILOBYTE = 1024;

const fileSizeText = (size: number) => {
    if (size > TERABYTE) {
        return `${(size / TERABYTE).toFixed(0)} ${i18next.t("static:05eab6e983464c5f8708045bd5131ebe")}`;
    }
    if (size > GIGABYTE) {
        return `${(size / GIGABYTE).toFixed(0)} ${i18next.t("static:8d7f133d5ef04c4485748e38635fe9eb")}`;
    }
    if (size > MEGABYTE) {
        return `${(size / MEGABYTE).toFixed(0)} ${i18next.t("static:58f3245889924db1b023691819f34607")}`;
    }
    if (size > KILOBYTE) {
        return `${(size / KILOBYTE).toFixed(0)} ${i18next.t("static:82c9683d5aa7483aadc6b0b21f3dd174")}`;
    }

    return `${size} ${i18next.t("static:bc377ecb59164cc4915c669130e298ef")}`;
};

interface IFileInputModelProps extends IStoreBaseModelProps {
    field: IField;
}

export class FileInputModel extends StoreBaseModel {
    fileTypes: Array<string>;
    field: IField;

    constructor(props: IFileInputModelProps) {
        super(props);
        this.field = props.field;

        this.fileTypes = this.bc.filetypes
            ? this.bc.filetypes.split(",").reduce((obj: string[], ext) => {
                  const value = mime.getType(ext.trim());

                  obj.push(`.${ext}`);
                  if (value) {
                      obj.push(value);
                  }
                  if (value === "application/zip") {
                      obj.push("application/x-zip-compressed");
                  }
                  if (ext === "csv") {
                      obj.push("text/csv");
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
                  ".doc",
                  ".docx",
                  ".odt",
                  ".ods",
                  ".zip",
                  ".csv",
                  ".xls",
                  ".xlsx",
                  "application/vnd.oasis.opendocument.spreadsheet",
                  "text/plain",
              ];
    }

    fileChooseAwait = (files: File[]) => {
        const isValid = files.every((file) => this.validateFile(file));

        if (isValid) {
            this.field.onChange(files);
        }
    };

    validateFile = (file: File): boolean => {
        let success = true;

        if (!fileSizeValidate(file, this.bc.maxfile)) {
            success = false;
            snackbarStore.snackbarOpenAction(
                {
                    status: "error",
                    text: `${i18next.t("static:7d9d6e64612643cfa6bb568cd3bde543")} ${fileSizeText(
                        this.bc.maxfile || 5242880,
                    )}`,
                },
                this.pageStore.route,
            );
        }
        if (!fileTypeValidate(file, this.fileTypes)) {
            success = false;
            snackbarStore.snackbarOpenAction(
                {
                    status: "error",
                    text: `${i18next.t("static:5d4e96bd15bb429195f2bbef3e0ff126")} ${
                        this.bc.filetypes ? this.bc.filetypes : "doc, docx, pdf, zip, txt, ods, odt, xls, xlsx"
                    }`,
                },
                this.pageStore.route,
            );
        }

        return success;
    };
}
