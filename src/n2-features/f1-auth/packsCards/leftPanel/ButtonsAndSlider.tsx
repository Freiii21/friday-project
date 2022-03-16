import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@mui/material/Slider';
import React from 'react';

function valuetext(value: number) {
    return `${value}°C`;
}

export const ButtonsAndSlider = () => {
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    const styleGridItem = {
        marginTop: '50px',
        height: '90vh',
        paddingLeft: '20px',
    }
    return (
        <Grid item style={styleGridItem} xs={11}>
            <Typography variant={'h6'}>
                show packs cards
            </Typography>
            <ButtonGroup disableElevation variant="contained" color="primary" size={'small'}>
                <Button>My</Button>
                <Button>All</Button>
            </ButtonGroup>
            <div style={{marginTop: '30px'}}>
                <Typography variant={'h6'}>
                    Number of cards
                </Typography>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
            </div>
        </Grid>
    );
}