import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch} from 'react-redux';
import {AppDrawer} from './AppDrawer';
import HeaderMI from '../header/HeaderMI';
import {RoutesComponent} from '../routes/RoutesComponent';
import {checkAuthMeTC} from '../../m2-bll/reducers/authReducer';
import SnackBarMessage from '../common/info_messages/SnackBarMessage';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useTypedSelector} from '../../m2-bll/redux';


const App = () => {
    const dispatch = useDispatch();
    const isRegistrated = useTypedSelector(state => state.auth.isRegistered);
    const [toggleDrawer, setToggleDrawer] = useState(false)
    useEffect(() => {
        dispatch(checkAuthMeTC({}));
    }, [])
    if (!isRegistrated) return <Box sx={{display: 'flex'}}>
        <CircularProgress/>
    </Box>
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
