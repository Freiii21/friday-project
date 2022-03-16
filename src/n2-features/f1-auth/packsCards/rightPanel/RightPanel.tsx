import Grid from '@mui/material/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Search} from './Search';
import {TablePacks} from './table/TablePacks';
import {Pagination} from './Pagination';

export const RightPanel = () => {
    return (
        <Grid container xs={8}
            sx={{backgroundColor:'gray',padding:' 0 0.5%'}}
        >
            <Search/>
            <TablePacks/>
            <Pagination/>
        </Grid>
    )
}