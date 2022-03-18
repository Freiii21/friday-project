import React, {useEffect} from 'react';
import {LeftPanel} from './leftPanel/LeftPanel';
import {RightPanel} from './rightPanel/RightPanel';
import Grid from '@mui/material/Grid';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getPacksCards} from '../../../n1-main/m2-bll/reducers/packsReducer';


export const PacksCards = () => {
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const cardPacksTotalCount = useTypedSelector(state => state.packs.data.cardPacksTotalCount);
    const numberPages = cardPacksTotalCount / 10 + (cardPacksTotalCount % 10);
    const cardPacksMin = useTypedSelector(state => state.packs.minCardsValue);
    const cardPacksMax = useTypedSelector(state => state.packs.maxCardsValue);
    const cardUserID = useTypedSelector(state => state.packs.userId);
    const cardName = useTypedSelector(state => state.packs.cardName);

    useEffect(() => {
        dispatch(getPacksCards({
            packName: cardName,
            pageCount: numberPages,
            user_id: cardUserID,
            // min: cardPacksMin,
            // max: cardPacksMax
        }))

    }, [cardPacksTotalCount, cardUserID, cardName]);

    if (!isAuth) return <Navigate to={PATH.LOGIN}/>
    return (
        <Grid container
              sx={{marginTop: 1}}
        >
            <LeftPanel/>
            <RightPanel/>
        </Grid>
    )
}