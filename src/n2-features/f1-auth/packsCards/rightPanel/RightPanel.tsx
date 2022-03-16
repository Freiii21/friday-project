import Grid from '@mui/material/Grid';
import React from 'react';
import {Search} from './Search';
import {TablePacks} from '../../../../n1-main/m1-ui/common/TablePacks';

export const RightPanel = () => {
    return (
        <Grid container xs={8} md={9} xl={10}
              sx={{backgroundColor: 'gray', padding: ' 0 0.5%'}}
        >
            <Search/>
            <TablePacks/>
        </Grid>
    )
}