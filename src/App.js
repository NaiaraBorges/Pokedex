import React from 'react';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';

import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
       <Route exact path="/" render={(props) => <Pokedex {...props} />} />
       <Route
        exact
        path="/:pokemonId"
        render={(props) => <Pokemon {...props} />}
      />
    </Switch>
  );
}

export default App;
