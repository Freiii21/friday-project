import React, {useEffect} from 'react';
import {LeftPanel} from './leftPanel/LeftPanel';
import {RightPanel} from './rightPanel/RightPanel';
import Grid from '@mui/material/Grid';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getPacksTC, setCardsName} from '../../../n1-main/m2-bll/reducers/packsReducer';


export const PacksCards = () => {
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPacksTC())
    }, []);

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