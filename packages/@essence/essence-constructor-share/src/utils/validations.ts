const phoneRegexp = /^[8]{1}[0-9]{10}$/;
const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailRegexp = new RegExp(
    [
        // eslint-disable-next-line quotes
        "/^(([^<>()[]\\.,;:s@\"]+(.[^<>()[]\\.,;:s@\"]+)*)|(\".+\"))",
        "@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])",
        "|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/",
    ].join(""),
);
const maxFileSize = 5242880;

export const requiredValidate = (value: string) => (value ? undefined : "Обязательно для заполнения");
export const regexpValidate = (regString: string, errorMessage?: string) => {
    const reg = new RegExp(regString);

    return (value: string) => (reg.test(value) ? undefined : errorMessage || `Введите текст по маске ${regString}`);
};
export const fieldSizeValidate = (nnFieldSize: number) => (value?: string) =>
    !value || `${value}`.length <= nnFieldSize ? undefined : `Поле должно содержать не более ${nnFieldSize} символов`;
export const phoneRequiredValidate = (value: string) =>
    phoneRegexp.test(value) ? undefined : "Введен некоректный номер телефона.";
export const emailRequiredValidate = (value: string) =>
    emailRegexp.test(value) ? undefined : "Введен некоректный email.";
export const passwordRequiredValidate = (value: string) =>
    passwordRegexp.test(value) ? undefined : "Введен некоректный пароль.";

export const composeValidators = (...validators: Array<(value: string) => boolean>) => (value: string) =>
    validators.reduce((error, validator) => error || validator(value), undefined);

export const fileTypeValidate = (file: any, fileMime: string[] = []) => {
    const fileTypes = fileMime.length
        ? fileMime
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

    return fileTypes.includes(file.type);
};

export const fileSizeValidate = (file: any, maxfile: string | null) => {
    const maxSize = maxfile ? Number(maxfile) : maxFileSize;

    return file.size < maxSize;
};
