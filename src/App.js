import './styles/App.scss';
import React from "react";
import UiStepOne from "./container/Home";
import UiStepTwo from "./container/Ayah";
import UiStepThree from "./container/Detail";
import UiDarkMode from "./components/DarkMode";
import { useEffect } from "react";
import {
  // BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  useEffect(() => {
    function checkLocalStorage() {
       // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        document.getElementById('body').classList.add('dark:bg-gray-700')
      } else {
        document.documentElement.classList.remove('dark')
        document.getElementById('body').classList.remove('dark:bg-gray-700')
      }
    } 
    checkLocalStorage()
    window.addEventListener('storage', checkLocalStorage)
    return () => {
      window.removeEventListener('storage', checkLocalStorage)
    }  
 },[]);
  return (
    <div className="max-w-sm relative m-auto h-screen">
      <div className="container mx-auto font-sans max-w-sm">
        <HashRouter>
          <Switch>
            <Route exact path='/'>
              <UiDarkMode/> 
              <UiStepOne/>
            </Route>
            <Route path='/surah/:id/:ayat'>
              <UiDarkMode/> 
              <UiStepThree/>
            </Route>
            <Route path='/surah/:id'>
              <UiDarkMode/>
              <UiStepTwo/>
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
