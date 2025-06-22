import * as React from "react";
import {Box, Grid, Typography} from "@mui/material";
import {IClassProps} from "@essence-community/constructor-share/types";
import {mapComponents} from "@essence-community/constructor-share/components";
import {PromoExampleBuildContainer} from "../../containers/PromoExampleBuildContainer";
import {makeChildsBehavior} from "../../mock/childsBehavior";

export const PromoExamples: React.FC<IClassProps> = (props) => {
    const behaviorBc = React.useMemo(() => makeChildsBehavior(props.bc), [props.bc]);

    return (
        <Box padding={4}>
            <Grid container direction="column">
                <Grid>
                    <Typography variant="h4" gutterBottom>
                        Простой компонент
                    </Typography>
                    <Typography>
                        приложения essence собираются из простейших и понятных пользователю элементов интерфейса
                    </Typography>
                    <Box>
                        <PromoExampleBuildContainer {...props} />
                    </Box>
                </Grid>

                <Grid>
                    <Typography variant="h4" gutterBottom>
                        Гибкая настройка поведения компонентов
                    </Typography>
                    <Typography>
                        используя атрибуты в конструкторе, можно создавать правила поведения для интерфейса приложения
                    </Typography>
                    <Box height={250} display="flex">
                        {mapComponents(behaviorBc, (ChildCmp, childBc) => (
                            <ChildCmp {...props} bc={childBc} />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
