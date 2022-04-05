import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@mui/material/Slider';
import React, {useCallback, useState} from 'react';
import {useTypedSelector} from '../../../../n1-main/m2-bll/redux';
import {useDispatch} from 'react-redux';
import {setMaxMinValue, setUserID} from '../../../../n1-main/m2-bll/reducers/packsReducer';


function valuetext(value: number) {
    return `${value}°C`;
}

export const ButtonsAndSlider = () => {
    const dispatch = useDispatch()

    const userId = useTypedSelector(state => state.auth.user._id);
    const packsMinCardsCount = useTypedSelector(state => state.packs.data.minCardsCount);
    const packsMaxCardsCount = useTypedSelector(state => state.packs.data.maxCardsCount);
    const pacsSetMin = useTypedSelector(state => state.packs.getPackData.min);
    const pacsSetMax = useTypedSelector(state => state.packs.getPackData.max);
    const status = useTypedSelector(state => state.app.status);
    const value = [pacsSetMin, pacsSetMax]

    const handleChange = useCallback((event: Event, newValue: number | number[]) => {
        dispatch(setMaxMinValue(newValue as number[]))
    }, [])

    const handlerButtonSetId = () => {
        dispatch(setUserID(userId))
        setDisableButton(!disableButton)
    }
    const handlerButtonSetALL = () => {
        dispatch(setUserID(''))
        setDisableButton(!disableButton)
    }
    const styleGridItem = {
        marginTop: '50px',
        height: '90vh',
        paddingLeft: '20px',
    }

    const [disableButton, setDisableButton] = useState(false)
    return (
        <Grid item style={styleGridItem} xs={11} display={'flex'} direction={'column'} alignItems={'center'}>
            <Typography color={'primary'}>
                show packs cards
            </Typography>
            <ButtonGroup
                orientation="vertical"
                disableElevation
                variant="contained"
                color="primary" size={'small'}
                disabled={status === 'loading'}
            >

                <Button disabled={disableButton} onClick={handlerButtonSetId}>My</Button>
                <Button disabled={!disableButton} onClick={handlerButtonSetALL}>All</Button>
            </ButtonGroup>
            <div style={{marginTop: '30px'}}>
                <Typography color={'primary'}>
                    Number of cards
                </Typography>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    min={packsMinCardsCount}
                    max={packsMaxCardsCount}
                    step={1}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disabled={status === 'loading'}
                />
            </div>

        </Grid>
    );
}