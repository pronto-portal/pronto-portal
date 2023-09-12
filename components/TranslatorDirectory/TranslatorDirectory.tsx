import React from "react";
import { Collapsable } from "../Collapsable";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { TranslatorDirectorySearch } from "./TranslatorDirectorySearch";
import { TranslatorsTable } from "../TranslatorsTable";
import { User } from "../../types/User";

interface TranslatorDirectoryProps {
    data: User[];
}

export const TranslatorDirectory: React.FC<TranslatorDirectoryProps> = ({ data }) => {
    // No longer using the useGetTranslatorsQuery hook. Instead, we use the passed data prop directly.

    return (
        <Collapsable title="Translators" sx={{ width: "100%" }}>
            {data ? (
                <Grid container direction="column" sx={{ width: "100%" }}>
                    <Grid item sx={{ width: "100%" }} xs={2}>
                        <TranslatorDirectorySearch translators={data} />
                    </Grid>
                    <Grid item sx={{ width: "100%" }} xs={9}>
                        {/* You can add additional content or components here if needed. */}
                    </Grid>
                    <Grid item sx={{ width: "100%" }} xs={1}>
                        <TranslatorsTable data={data} />
                    </Grid>
                </Grid>
            ) : (
                <LinearProgress sx={{ width: "100%" }} />
            )}
        </Collapsable>
    );
};
