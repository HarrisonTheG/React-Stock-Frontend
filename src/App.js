
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login.js'
import Navbar from './components/Navbar/Navbar.js'
import SearchStock from './components/Search_Stock/SearchStock.js'
import Watchlist from './components/Watchlist/Watchlist.js'
import History from './components/History/History.js'


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
      </Switch>
    </div>
  );
}

export default App;
