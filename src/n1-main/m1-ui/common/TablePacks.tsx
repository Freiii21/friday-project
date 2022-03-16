import Grid from '@mui/material/Grid';
import {useEffect} from 'react';
import {packsAPI} from '../../m2-bll/api/api';
import {TableM} from '../../../n2-features/f1-auth/packsCards/rightPanel/table/TableM';
import {useDispatch} from 'react-redux';
import {getPacks, getPacksCards} from '../../m2-bll/reducers/cardsReducer';
import {useTypedSelector} from '../../m2-bll/redux';

export const TablePacks = () => {
    const dispatch = useDispatch();
    const cardPacksTotalCount = useTypedSelector(state => state.cards.data.cardPacksTotalCount);
    const numberPages = cardPacksTotalCount / 10;
    useEffect(() => {
        dispatch(getPacksCards({pageCount: numberPages}));
    }, [])
    return (
        <Grid container xs={12} sx={{backgroundColor: 'silver', minHeight: '70vh', margin: 0}}>
            <TableM/>
        </Grid>
    );
}