import React from 'react';
import Grid from '@mui/material/Grid';
import {ButtonsAndSlider} from './ButtonsAndSlider';



export const LeftPanel = () => {

    return (
        <Grid container xs={4}
            sx={{backgroundColor:'whitesmoke'}}
        >
            <ButtonsAndSlider/>
        </Grid>
    )
}
