import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Search from './pages/search/Search'
import Menu from './components/menu/Menu';
import './App.css';
import Favorites from './pages/favorites/Favorites';
import Character from './pages/character/Character';
import Comic from './pages/comic/Comic';
import Story from './pages/story/Story';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu></Menu>
        <Redirect from="/" to="/search" />
        <Switch>
          <Route exact path="/search" render={props => <Search {...props} />} />
          <Route exact path="/favorites" render={props => <Favorites {...props} />} />
          <Route exact path="/character/:id" render={props => <Character {...props} />} />
          <Route exact path="/comic/:id" render={props => <Comic {...props} />} />
          <Route exact path="/story/:id" render={props => <Story {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
