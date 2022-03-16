import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@mui/material/Slider';
import React from 'react';
import {useTypedSelector} from "../../../../n1-main/m2-bll/redux";
import {useDispatch} from "react-redux";
import {setMaxMinValue, setUserID} from "../../../../n1-main/m2-bll/reducers/packsReducer";

function valuetext(value: number) {
    return `${value}°C`;
}

export const ButtonsAndSlider = () => {

    const dispatch = useDispatch()

    const cardPacksMaxCardsCount = useTypedSelector(state => state.packs.data.maxCardsCount);
    const cardPacksMinCardsCount = useTypedSelector(state => state.packs.data.minCardsCount);
    const userId = useTypedSelector(state => state.auth.user._id);
    const userId2 = useTypedSelector(state => state.packs.userId);

    const [value, setValue] = React.useState<number[]>([cardPacksMinCardsCount, cardPacksMaxCardsCount]);
    // const value = [0, cardPacksMaxCardsCount]


    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        // console.log(newValue)
        //     dispatch(setMaxMinValue(value[0],value[1]))

    };
    console.log(userId)
    console.log(userId2)
    const handlerButtonSetId = () => {
        dispatch(setUserID(userId))
    }
    const handlerButtonSetALL = () => {
        dispatch(setUserID(""))
    }
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
                <Button onClick={handlerButtonSetId}>My</Button>
                <Button onClick={handlerButtonSetALL}>All</Button>
            </ButtonGroup>
            <div style={{marginTop: '30px'}}>
                <Typography variant={'h6'}>
                    Number of cards
                </Typography>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    min={cardPacksMinCardsCount}
                    max={cardPacksMaxCardsCount}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
            </div>
        </Grid>
    );
}