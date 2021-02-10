import React, { useState, useEffect } from "react";
import API from "./../api/index.js";

function renderSurah(surah) {
  return(
    <div className="px-4 animate__animated animate__slideInLeft">
      <input type="text" placeholder="Cari surat"/>
      {surah.map((item) => {return(<div>{item.surat_name}</div>)})}
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
