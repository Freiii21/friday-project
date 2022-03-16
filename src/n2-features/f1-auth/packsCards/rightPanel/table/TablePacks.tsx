import Grid from '@mui/material/Grid';
import {useEffect} from 'react';
import {cardsAPI} from '../../../../../n1-main/m2-bll/api/api';
import {TableM} from './TableM';
import {useDispatch} from 'react-redux';
import {getPacks} from '../../../../../n1-main/m2-bll/reducers/packsReducer';

export const TablePacks = () => {
    const dispatch=useDispatch();
    useEffect(() => {
        cardsAPI.getPacks({page: 2, pageCount: 100}).then((res) => {
           debugger
            dispatch(getPacks(res.data))
        })
    }, [])
    return (
        <Grid container xs={12} sx={{backgroundColor: 'silver', minHeight: '70vh', margin: 0}}>
            <TableM/>
        </Grid>
    );
}