import React from "react";
import { Grid } from "@mui/material";
import { Password, UserDetails } from "../components";

export const SettingsView = () => {
    return (
        <Grid container spacing={2} maxWidth={'xl'} justifyContent={'center'}>
            <UserDetails />
            <Password />
        </Grid>
    );
}