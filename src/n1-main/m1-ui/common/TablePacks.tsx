import Grid from '@mui/material/Grid';
import {useEffect} from 'react';
import {cardsAPI} from '../../m2-bll/api/api';
import {TableM} from '../../../n2-features/f1-auth/packsCards/rightPanel/table/TableM';
import {useDispatch} from 'react-redux';
import {getPacks} from '../../m2-bll/reducers/cardsReducer';

export const TablePacks = () => {
    const dispatch=useDispatch();
    useEffect(() => {
        cardsAPI.getPacks({page: 2, pageCount: 100}).then((res) => {
            dispatch(getPacks(res.data))
        })
    }, [])
    return (
        <Grid container xs={12} sx={{backgroundColor: 'silver', minHeight: '70vh', margin: 0}}>
            <TableM/>
        </Grid>
    );
}