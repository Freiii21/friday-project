import React, {useState} from 'react';
import './App.css';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {ErrorWindow} from '../errorWindow/ErrorWindow';

import {AppDrawer} from './AppDrawer';
import HeaderMI from '../header/HeaderMI';
import {RoutesComponent} from '../routes/RoutesComponent';

const App = () => {
const [toggleDrawer,setToggleDrawer]=useState(false);
    const error = useSelector<AppRootStateType, boolean>(state => state.auth.error)

    return (
        <div className="App">
           {/* <Header/>*/}
            <HeaderMI switchDrawer={setToggleDrawer}/>
            <AppDrawer toggle={toggleDrawer} switchDrawer={setToggleDrawer}/>
            <RoutesComponent/>
            {error && <ErrorWindow/>}
        </div>
    );
}

export default App;
