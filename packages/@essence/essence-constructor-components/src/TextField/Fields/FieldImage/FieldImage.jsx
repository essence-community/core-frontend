// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {compose} from "recompose";
import {toSize, parseMemoize, withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {downloadImage} from "@essence/essence-constructor-share/utils/download";
import {type PropsType} from "./FieldImageTypes";
import {styles} from "./FieldImageStyle";

class FieldImage extends React.Component<PropsType & WithT> {
    handleDownload = () => {
        // eslint-disable-next-line id-length
        const {field, form, t} = this.props;
        const fieldWithName = form.select(`${field.key}Filename`, null, false);

        downloadImage(
            typeof field.value === "string" ? this.getSrc(field.value) : "",
            t((fieldWithName && fieldWithName.value) || "157badbc579e439d8cae1d60ceff9aa9"),
        );
    };

    getValue = (name: string) => {
        const {form} = this.props;
        const {globalValues} = this.props.pageStore;

        if (name.charAt(0) === "g") {
            return globalValues.get(name);
        }

        return form.has(name) ? form.$(name).value : undefined;
    };

    getSrc = (value: string) => {
        if (value.indexOf("${") >= 0) {
            const path = parseMemoize(`\`${value}\``).runer({get: this.getValue});

            return path.indexOf("http") === 0 ? path : `${window.location.origin}${path}`;
        }

        return value;
    };

    render() {
        // eslint-disable-next-line id-length
        const {bc, classes, field, form, t} = this.props;
        const {height} = bc;
        const fieldWithName = form.select(`${field.key}Filename`, null, false);
        const {origin} = window.location;
        const src = typeof field.value === "string" ? this.getSrc(field.value) : "";

        return (
            <div
                className={classes.container}
                style={{
                    height: toSize(height),
                }}
            >
                {src ? (
                    <React.Fragment>
                        <img
                            alt=""
                            src={src}
                            className={height ? classes.zoomImg : classes.img}
                            data-qtip={t(fieldWithName ? fieldWithName.value : "157badbc579e439d8cae1d60ceff9aa9")}
                        />
                        {src.indexOf(origin) === 0 && (
                            <div className={classes.downloadBtn} onClick={this.handleDownload}>
                                <Icon size="lg" iconfont="download" />
                                <span className={classes.downloadBtnText}>{t("4a401209683245609626506a762717af")}</span>
                            </div>
                        )}
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}

export default compose(withTranslation("meta"), withStyles(styles), observer)(FieldImage);
