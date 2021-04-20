import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const authenticatedRouts = ['/home'];
const unauthenticatedRouts = ['/login', '/registration'];

const Authentication = ({children}: any) => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        let isAuthenticated = false;

        const getUserRoute = () => {
            let currentRoute;
            let defaultRoute = '/login';

            if(isAuthenticated) {
                defaultRoute = '/home';
                currentRoute = authenticatedRouts.find(route => route === location.pathname);
            } else {
                currentRoute = unauthenticatedRouts.find(route => route === location.pathname);
            }

            currentRoute ? history.push(currentRoute) : history.push(defaultRoute);
        }

        try {
            if(!localStorage.getItem('token')) {
                isAuthenticated = false;
                getUserRoute();
            } else {
                axios.get('http://localhost:3000/users', {
                    headers: {
                        'Token': localStorage.getItem('token')
                    }
                }).then(res => {
                    const user = res.data._doc;
                    if(user.length !== 0) {
                        isAuthenticated = true;
                    } else {
                        isAuthenticated = false;
                    }
                    getUserRoute();
                });
            }
        } catch(e) {
            console.log(e);
        }
    }, [history, location.pathname])

    return <div>{children}</div>
}

export default Authentication