import * as React from "react";
import {Grid, Typography, Box} from "@material-ui/core";
import {IconEditor} from "./IconEditor";
import {IconHand} from "./IconHand";
import {IconModule} from "./IconModule";
import {IconChanges} from "./IconChanges";

export const PromoInfo: React.FC = () => {
    return (
        <Box padding={4}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Box width="5rem" paddingBottom={1} color="textSecondary">
                        <IconEditor />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Визуальный редактор
                    </Typography>
                    <Typography>
                        Создавайте интерфейс без знания языков программирования просто и быстро. Достаточно указать
                        компонентам интерфейса к какому сервису обращаться. Essence все взаимодействие возьмет на себя
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box width="5rem" paddingBottom={1} color="textSecondary">
                        <IconHand />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Основан на компонентах
                    </Typography>
                    <Typography>
                        Создавайте приложения для решения своих задач из простейших элементов, затем объединяйте их в
                        сложные пользовательские интерфейсы
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box width="5rem" paddingBottom={1} color="textSecondary">
                        <IconModule />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Модульная структура
                    </Typography>
                    <Typography>
                        Подключайте плагины отчетности и различных систем авторизаций без изменения остальных частей
                        приложения.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box width="5rem" paddingBottom={1} color="textSecondary">
                        <IconChanges />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Горячие изменения
                    </Typography>
                    <Typography>Любые изменения вносятся в работающую систему без ее остановки</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
