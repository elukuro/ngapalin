import './styles/App.scss';
import React from "react";
import UiStepOne from "./container/Home";
import UiStepTwo from "./container/Ayah";
import UiStepThree from "./container/Detail";
import {
  // BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container mx-auto font-sans">
      <HashRouter>
        <Switch>
          <Route exact path='/'>
            <UiStepOne/>
          </Route>
          <Route path='/surah/:id/:ayat'>
            <UiStepThree/>
          </Route>
          <Route path='/surah/:id'>
            <UiStepTwo/>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
