const maxFileSize = 5242880;

/**
 * Used in FileInputModel
 */
export const fileTypeValidate = (file: File, fileMime: string[] = []) => {
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

/**
 * Used in FileInputModel
 */
export const fileSizeValidate = (file: File, maxfile: string | null) => {
    const maxSize = maxfile ? Number(maxfile) : maxFileSize;

    return file.size < maxSize;
};
