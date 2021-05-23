import { useHistory } from 'react-router-dom';
import { LOCAL_STORAGE_TOKEN_KEY } from "../hooks/api.hook";
import { useAuth } from '../providers/AuthProvider'

const Home = () => {
    const history = useHistory()
    const { user } = useAuth()
    
    return (
        <section>
            <div>
                {user?.firstName}
                {user?.lastName}
            </div>
            <button onClick={() => {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
                history.replace('/login')
            }}>Logout</button>
        </section>
    )
}
export default Home
