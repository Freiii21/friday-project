import Grid from '@mui/material/Grid';
import React from 'react';
import {Search} from './Search';
import {TablePacks} from './table/TablePacks';

export const RightPanel = () => {
    return (
        <Grid container xs={8} md={9} xl={10}
              sx={{backgroundColor: 'rgb(63, 81, 181)', padding: ' 0 0.5%'}}
        >
            <Search/>
            <TablePacks/>
        </Grid>
    )
}