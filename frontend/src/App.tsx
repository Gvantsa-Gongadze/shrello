import './App.css'
import Login from './components/Login'
import Registration from './components/Registration'
import EmailConfirmation from './components/EmailConfirmation'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/email-confirmation" component={EmailConfirmation} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
