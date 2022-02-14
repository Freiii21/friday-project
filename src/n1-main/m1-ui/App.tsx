import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from '../m2-bll/store';
import {RoutesComponent} from './routes/RoutesComponent';
import {Header} from './header/Header';

const App = () => {
    return (
        <div className="App">
            <Provider store={store}>
                <HashRouter>
                    <Header />
                    <RoutesComponent/>
                </HashRouter>
            </Provider>
        </div>
    );
}

export default App;
