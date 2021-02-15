import './styles/App.scss';
import React from "react";
import UiHome from "./container/Home";
import UiAyah from "./container/Ayah";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container mx-auto font-sans">
      <Router>
        <Switch>
          <Route exact path='/'>
            <UiHome/>
          </Route>
          <Route path='/surah/:surah/:ayat'>
            <UiAyah/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
