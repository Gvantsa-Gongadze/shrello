import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const authenticatedRouts = ['/home'];
const unauthenticatedRouts = ['/login', '/registration'];

const Authentication = ({children}: any) => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        try {
            axios.get('http://localhost:3000/users').then(res => {
                const user = res.data.filter((user: any) => {
                    return user.token === localStorage.getItem('token');
                })
                if(user.length !== 0) {
                    const currentRoute = authenticatedRouts.filter(rout => rout === location.pathname);
                    if(currentRoute.length !== 0) {
                        history.push(currentRoute[0]);
                    } else {
                        history.push('/home');
                    }
                } else {
                    const currentRoute = unauthenticatedRouts.filter(rout => rout === location.pathname);
                    if(currentRoute.length !== 0) {
                        history.push(currentRoute[0]);
                    } else {
                        history.push('/registration');
                    }
                }
            });
        } catch(e) {
            console.log(e);
        }
    }, [history, location.pathname])

    return <div>{children}</div>;
}

export default Authentication