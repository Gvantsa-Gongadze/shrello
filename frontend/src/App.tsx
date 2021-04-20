import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Registration from './components/Registration'
import EmailConfirmation from './components/EmailConfirmation'
import Authentication from './components/utils/Authentication'
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
                    <Authentication>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/registration" component={Registration} />
                        <Route exact path="/email-confirmation/:id" component={EmailConfirmation} />
                    </Authentication>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
