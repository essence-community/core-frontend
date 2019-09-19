// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {toSize, parseMemoize} from "@essence/essence-constructor-share/utils";
import {downloadImage} from "@essence/essence-constructor-share/utils/download";
import {type PropsType} from "./FieldImageTypes";
import {styles} from "./FieldImageStyle";

class FieldImage extends React.Component<PropsType> {
    handleDownload = () => {
        const {field, form} = this.props;
        const fieldWithName = form.select(`${field.key}Filename`, null, false);

        downloadImage(
            typeof field.value === "string" ? this.getSrc(field.value) : "",
            (fieldWithName && fieldWithName.value) || "Изображение",
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
        const {bc, classes, field, form} = this.props;
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
                            data-qtip={fieldWithName ? fieldWithName.value : ""}
                        />
                        {src.indexOf(origin) === 0 && (
                            <div className={classes.downloadBtn} onClick={this.handleDownload}>
                                <Icon size="lg" iconfont="download" />
                                <span className={classes.downloadBtnText}>Загрузить</span>
                            </div>
                        )}
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}

export default withStyles(styles)(observer(FieldImage));
