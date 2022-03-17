import Grid from '@mui/material/Grid';
import React from 'react';
import {Search} from './Search';
import {TablePacks} from "./table/TablePacks";

export const RightPanel = () => {
    return (
        <Grid container xs={8}
            sx={{backgroundColor:'gray',padding:' 0 0.5%'}}
        >
            <Search/>
            <TablePacks/>
        </Grid>
    )
}