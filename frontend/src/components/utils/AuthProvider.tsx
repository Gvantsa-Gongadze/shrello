import axios from 'axios';
import React, { useCallback } from 'react';
import { createContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

const AuthContext = createContext<{
    user: {} | null
}>({
    user: {}
});

const authenticatedRouts = ['/home'];
const unauthenticatedRouts = ['/login', '/registration'];

const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<{} | null>(null);
    const authToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const isAuthenticated = authToken !== undefined && authToken !== null;

    const history = useHistory();
    const location = useLocation();

    const fetchUser = useCallback(() => {
        try {
            axios.get('http://localhost:3000/users/token', {
                headers: {
                    'Token': authToken
                }
            }).then(res => {
                setUser(res?.data ? res?.data : null);
            })
        } catch(e) {
            console.log(e);
        }
    }, [authToken]);

    const getUserRoute = useCallback(() => {
        let currentRoute;
        let defaultRoute = '/login';

        if(isAuthenticated) {
            defaultRoute = '/home';
            currentRoute = authenticatedRouts.find(route => route === location.pathname);
        } else {
            currentRoute = unauthenticatedRouts.find(route => route === location.pathname);
        }

        currentRoute ? history.push(currentRoute) : history.push(defaultRoute);
    }, [history, isAuthenticated, location.pathname]);
    
    useEffect(() => {
        fetchUser();
        getUserRoute();
    }, [fetchUser, getUserRoute]);

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
}
const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider } 