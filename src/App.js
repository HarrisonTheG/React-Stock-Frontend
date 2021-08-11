
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import SearchStock from './components/Search_Stock/SearchStock.jsx'
import Watchlist from './components/Watchlist/Watchlist.jsx'
import History from './components/History/History.jsx'
import Register from './components/Login/Register'


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Login}/> 
        <Route exact path="/search" component={SearchStock}></Route>
        <Route exact path="/watchlist" component={Watchlist}></Route>
        <Route exact path="/history" component={History}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
      </Switch>
    </div>
  );
}

export default App;
