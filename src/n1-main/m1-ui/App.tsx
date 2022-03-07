import React from 'react';
import './App.css';
import { useSelector} from 'react-redux';
import {AppRootStateType} from '../m2-bll/store';
import {RoutesComponent} from './routes/RoutesComponent';
import {Header} from './header/Header';
import {ErrorWindow} from "./errorWindow/ErrorWindow";

const App = () => {

    const error = useSelector<AppRootStateType, boolean>(state => state.auth.error)

    return (
        <div className="App">
            <Header/>
            <RoutesComponent/>
            {error && <ErrorWindow/>}
        </div>
    );
}

export default App;
