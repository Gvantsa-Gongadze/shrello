import React, { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useApi } from '../hooks/api.hook';
import { AuthUser } from '../types';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

const AuthContext = createContext<{
    user: AuthUser | null
}>({
    user: {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        boards: [],
    }
});

const publicRoutes = ['/login', '/registration', '/forgot-password'];

interface AuthProviderProps {
    children: ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;

    const history = useHistory();
    const location = useLocation();

    const { fetchUser } = useApi()
    
    const [user, setUser] = useState<AuthUser | null>(null);

    const isAuthenticated = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) !== null

    // Don't query for user when in public URL
    useEffect(() => {
        if (publicRoutes.includes(location.pathname)){
            return
        }

        fetchUser().then(setUser)
    }, [fetchUser, location.pathname]);

    // Redirect user based on auth status
    useEffect(() => {
        if (publicRoutes.includes(location.pathname) && isAuthenticated) {
            history.replace('/')
            return
        }

        if (!publicRoutes.includes(location.pathname) && !isAuthenticated) {
            history.replace('/login')
            return
        }
    }, [history, isAuthenticated, location.pathname, user])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}
const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider } 