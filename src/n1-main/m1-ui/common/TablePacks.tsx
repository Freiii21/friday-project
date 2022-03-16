import Grid from '@mui/material/Grid';
import {useEffect} from 'react';
import {packsAPI} from '../../m2-bll/api/api';
import {TableM} from '../../../n2-features/f1-auth/packsCards/rightPanel/table/TableM';
import {useDispatch} from 'react-redux';
import {getPacks, getPacksCards} from '../../m2-bll/reducers/packsReducer';
import {useTypedSelector} from '../../m2-bll/redux';

export const TablePacks = () => {
    const dispatch = useDispatch();

    const cardPacksTotalCount = useTypedSelector(state => state.packs.data.cardPacksTotalCount);
    const cardPacksMaxCardsCount = useTypedSelector(state => state.packs.data.maxCardsCount);
    const cardPacksMinCardsCount = useTypedSelector(state => state.packs.data.minCardsCount);
    const cardUserID = useTypedSelector(state => state.packs.userId);
    const cardName = useTypedSelector(state => state.packs.cardName);

    const numberPages = cardPacksTotalCount / 10;

    useEffect(() => {
        dispatch(getPacksCards({packName: cardName, pageCount: numberPages, user_id: cardUserID}));
    }, [cardPacksTotalCount, cardUserID, cardName])

    return (
        <Grid container xs={12} sx={{backgroundColor: 'silver', minHeight: '70vh', margin: 0}}>
            <TableM/>
        </Grid>
    );
}