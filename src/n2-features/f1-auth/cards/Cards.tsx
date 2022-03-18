import Grid from '@mui/material/Grid';
import {TableCards} from './tableCards/TableCards';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {setCardsName} from '../../../n1-main/m2-bll/reducers/packsReducer';

export const Cards = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCardsName(''));
    })
    return (
        <Grid container sx={{marginTop: 1}}>
            <Grid item xs={12} sx={{minHeight: '70vh'}}>
                <TableCards/>
            </Grid>
        </Grid>
    );
}