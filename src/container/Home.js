import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import API from "./../api/index.js";

function renderSurah(surah) {
  return(
    <div>
      {surah.map((item) => {return(<div>{item.name.transliteration.id}</div>)})}
    </div>
  )
}

function Home() {
  const [surah, setSurah] = useState();
  useEffect(() => {
    API.getSurah().then(function (result) {
      setSurah(result.data);
    });
  },[]);
  if (surah) {
    return renderSurah(surah)
  } else {
    return <p>loading...</p>;
  }
}

export default Home;
