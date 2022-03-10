import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch} from 'react-redux';
import {AppDrawer} from './AppDrawer';
import HeaderMI from '../header/HeaderMI';
import {RoutesComponent} from '../routes/RoutesComponent';
import {checkAuthMeTC} from '../../m2-bll/reducers/authReducer';
import {useTypedSelector} from '../../m2-bll/redux';


const App = () => {
    const dispatch = useDispatch()
    const [toggleDrawer, setToggleDrawer] = useState(false)
    useEffect(() => {
        dispatch(checkAuthMeTC({}))
    }, [])
    return (
        <div className="App">
            <HeaderMI switchDrawer={setToggleDrawer}/>
            <AppDrawer toggle={toggleDrawer} switchDrawer={setToggleDrawer}/>
            <RoutesComponent/>
        </div>
    );
}

export default App;
