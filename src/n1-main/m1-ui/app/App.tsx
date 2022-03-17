import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch} from 'react-redux';
import {AppDrawer} from './AppDrawer';
import HeaderMI from '../header/HeaderMI';
import {RoutesComponent} from '../routes/RoutesComponent';
import {checkAuthMeTC} from '../../m2-bll/reducers/authReducer';
import SnackBarMessage from '../common/info_messages/SnackBarMessage';
import Container from '@mui/material/Container';
import {useTypedSelector} from '../../m2-bll/redux';
import {getPacksCards} from '../../m2-bll/reducers/packsReducer';


const App = () => {
    const dispatch = useDispatch();

    const [toggleDrawer, setToggleDrawer] = useState(false)
    useEffect(() => {
        dispatch(checkAuthMeTC({}));
        // dispatch(getPacksCards());
    }, [])
    return (
        <Container fixed sx={{mt: '0.5rem'}}>
            <SnackBarMessage/>
            <HeaderMI switchDrawer={setToggleDrawer}/>
            <AppDrawer toggle={toggleDrawer} switchDrawer={setToggleDrawer}/>
            <RoutesComponent/>
        </Container>
    );
}

export default App;
