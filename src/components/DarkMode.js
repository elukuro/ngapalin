import React, { useEffect, useState } from "react";
import "./../styles/components/darkmode.scss";

function DarkMode() {
  const [darkMode, setDarkMode] = useState();
  const toggleDarkMode = function (value) {
    let toggle = (value === 'dark') ?'light' :'dark';

    if(toggle === 'dark'){
      document.documentElement.classList.add('dark')
      document.getElementById('body').classList.add('dark:bg-gray-700')
    }else{
      document.documentElement.classList.remove('dark')
      document.getElementById('body').classList.remove('dark:bg-gray-700')
    }
    localStorage.setItem('theme',toggle);
    setDarkMode(toggle);
  };
  useEffect(() => {
      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setDarkMode("dark");
      } else {
        setDarkMode("light");
      }
  }, []);
  return (
    <div
      className="fixed mt-4 left-0 dark:from-purple-900 bg-gradient-to-r from-purple-400 via-purple-700 to-purple-700 rounded-r-full opacity-70"
      onClick={() => toggleDarkMode(darkMode)}
    >
      <span className="text-xs font-light dark:text-gray-200 px-2 text-gray-200">
        {(darkMode ==='dark')? '🌤' : '🌕' }  mode
      </span>
    </div>
  );
}

export default DarkMode;
