import * as React from "react";
import {Icon} from "@essence-community/constructor-share/Icon";
import {parseMemoize, useTranslation} from "@essence-community/constructor-share/utils";
import {downloadImage} from "@essence-community/constructor-share/utils/download";
import {IClassProps} from "@essence-community/constructor-share/types";
import {FormContext} from "@essence-community/constructor-share";
import {useField} from "@essence-community/constructor-share/Form";
import {useObserver} from "mobx-react";
import {useStyles} from "./FieldImageContainer.styles";

export const FieldImageContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden} = props;
    const form = React.useContext(FormContext);
    const field = useField({bc, disabled, hidden, pageStore});
    const [trans] = useTranslation("meta");
    const classes = useStyles();

    const getValue = React.useCallback(
        (name: string) => {
            const {globalValues} = pageStore;

            if (name.charAt(0) === "g") {
                return globalValues.get(name);
            }

            return form.select(name)?.value;
        },
        [form, pageStore],
    );

    const getSrc = React.useCallback(
        (value: string) => {
            if (value.indexOf("${") >= 0) {
                const path = parseMemoize(`\`${value}\``).runer({get: getValue});

                return path.indexOf("http") === 0 ? path : `${window.location.origin}${path}`;
            }

            return value;
        },
        [getValue],
    );

    const handleDownload = () => {
        const fieldWithName = form.select(`${field.key}_filename`);
        const fileName = (fieldWithName?.value || "static:157badbc579e439d8cae1d60ceff9aa9") as string;

        downloadImage(typeof field.value === "string" ? getSrc(field.value) : "", trans(fileName));
    };

    return useObserver(() => {
        const fieldWithName = form.select(`${field.key}_filename`);
        const {origin} = window.location;
        const src = typeof field.value === "string" ? getSrc(field.value) : "";

        return (
            <div className={classes.container} style={{height: bc.height}}>
                {src ? (
                    <React.Fragment>
                        <img
                            alt=""
                            src={src}
                            className={bc.height ? classes.zoomImg : classes.img}
                            data-qtip={trans(
                                fieldWithName
                                    ? (fieldWithName.value as string)
                                    : "static:157badbc579e439d8cae1d60ceff9aa9",
                            )}
                        />
                        {src.indexOf(origin) === 0 && (
                            <div className={classes.downloadBtn} onClick={handleDownload}>
                                <Icon size="lg" iconfont="download" />
                                <span className={classes.downloadBtnText}>
                                    {trans("static:02260da507494f2f9956ba9e0f37b1f1")}
                                </span>
                            </div>
                        )}
                    </React.Fragment>
                ) : null}
            </div>
        );
    });
};
