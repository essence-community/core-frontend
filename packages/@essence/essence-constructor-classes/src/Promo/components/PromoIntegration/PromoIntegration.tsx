import * as React from "react";
import {Box, Typography} from "@material-ui/core";

export const PromoIntegration = () => {
    return (
        <Box padding={4}>
            <Box maxWidth="50rem">
                <Typography variant="h4" gutterBottom>
                    Единый контроллер управления бизнес процессами для различных источников
                </Typography>
            </Box>
            <Box maxWidth="30rem">
                <Typography gutterBottom>
                    Essence позволяет подключать любые источники данных. Oracle, PostgresSQL или API.
                </Typography>
            </Box>
        </Box>
    );
};
