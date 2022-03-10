import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch} from 'react-redux';
import {ErrorWindow} from '../errorWindow/ErrorWindow';
import {AppDrawer} from './AppDrawer';
import HeaderMI from '../header/HeaderMI';
import {RoutesComponent} from '../routes/RoutesComponent';
import {checkAuthMeTC} from "../../m2-bll/reducers/authReducer";
import {useTypedSelector} from "../../m2-bll/redux";



const App = () => {
    const dispatch = useDispatch()
    const [toggleDrawer,setToggleDrawer]=useState(false)
    const error = useTypedSelector(state => state.auth.error)
    const status = useTypedSelector(state => state.app.status)


    useEffect(() => {
        dispatch(checkAuthMeTC({}))
    }, [])

    if (status === "loading") return <div>LOADING...</div>


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
