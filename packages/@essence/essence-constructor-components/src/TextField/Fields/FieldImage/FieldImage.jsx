// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {toSize} from "@essence/essence-constructor-share/utils";
import {downloadImage} from "@essence/essence-constructor-share/utils/download";
import {type PropsType} from "./FieldImageTypes";
import {styles} from "./FieldImageStyle";

class FieldImage extends React.Component<PropsType> {
    handleDownload = () => {
        const {field, form} = this.props;
        const fieldWithName = form.select(`${field.key}Filename`, null, false);

        downloadImage(
            typeof field.value === "string" ? field.value : "",
            (fieldWithName && fieldWithName.value) || "Изображение",
        );
    };

    render() {
        const {bc, classes, field, form} = this.props;
        const {height} = bc;
        const fieldWithName = form.select(`${field.key}Filename`, null, false);

        return (
            <div
                className={classes.container}
                style={{
                    height: toSize(height),
                }}
            >
                {field.value ? (
                    <React.Fragment>
                        <img
                            alt=""
                            src={field.value}
                            className={height ? classes.zoomImg : classes.img}
                            data-qtip={fieldWithName ? fieldWithName.value : ""}
                        />
                        <div className={classes.downloadBtn} onClick={this.handleDownload}>
                            <Icon size="lg" iconfont="download" />
                            <span className={classes.downloadBtnText}>Загрузить</span>
                        </div>
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}

export default withStyles(styles)(observer(FieldImage));
