import React from 'react';
import {LeftPanel} from './leftPanel/LeftPanel';
import {RightPanel} from './rightPanel/RightPanel';
import Grid from '@mui/material/Grid';


export const PacksCards = () => {

    return (
        <Grid container
              sx={{marginTop:1}}
        >
            <LeftPanel/>
           <RightPanel/>
        </Grid>
    )
}
