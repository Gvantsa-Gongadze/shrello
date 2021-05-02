import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Registration from './components/Registration'
import EmailConfirmation from './components/EmailConfirmation'
import { AuthProvider } from './providers/AuthProvider'
import 'antd/dist/antd.css';
import './index.css';
import { MainLayout } from './components/MainLayout';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <AuthProvider>
                    <MainLayout>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/registration" component={Registration} />
                        <Route exact path="/email-confirmation/:id" component={EmailConfirmation} />
                    </MainLayout>
                </AuthProvider>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
