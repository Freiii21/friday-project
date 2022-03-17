import Grid from '@mui/material/Grid';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from "../../../../../n1-main/m2-bll/redux";
import {getPacksCards} from "../../../../../n1-main/m2-bll/reducers/packsReducer";
import {TableM} from "./TableM";



export const TablePacks = () => {
    const dispatch = useDispatch();

    const cardPacksTotalCount = useTypedSelector(state => state.packs.data.cardPacksTotalCount);
    const cardPacksMin = useTypedSelector(state => state.packs.minCardsValue);
    const cardPacksMax = useTypedSelector(state => state.packs.maxCardsValue);
    const cardUserID = useTypedSelector(state => state.packs.userId);
    const cardName = useTypedSelector(state => state.packs.cardName);

    const numberPages = cardPacksTotalCount / 10;

    useEffect(() => {
        dispatch(getPacksCards({
            packName: cardName,
            pageCount: numberPages,
            user_id: cardUserID,
            // min: cardPacksMin,
            // max: cardPacksMax
        }))

    }, [cardPacksTotalCount, cardUserID, cardName])

    return (
        <Grid container xs={12} sx={{backgroundColor: 'silver', minHeight: '70vh', margin: 0}}>
            <TableM/>
        </Grid>
    );
}