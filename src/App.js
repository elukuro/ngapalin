import './styles/App.scss';
import React from "react";
import UiHome from "./container/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <UiHome/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
