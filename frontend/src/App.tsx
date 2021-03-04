import './App.css';
import Login from './components/Login'
import Registration from './components/Registration'
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
                </Switch>
            </div>
        </Router>
    );
}

export default App;
