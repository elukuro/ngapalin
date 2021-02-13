import React, { useState, useEffect } from "react";
import API from "./../api/index.js";
import UiLoading from "./../components/Loading";
import UiStep from "./../components/Step";
import UiCard from "./../components/Card";
import "./../styles/container/home.scss";

function renderSurah(surah) {
  return(
    <div className="px-4">
      <UiStep step="1" />
      <p className="text-center container mx-auto font-extralight text-xl my-10">Pilih surat</p>
      <div className="overflow-scroll	overflow-x-hidden scroll">
        {surah.map((item) => {
          return(
            <div className="my-5">
              <UiCard key={item.surat_name} content = {item.surat_name}/>
            </div>
          )
        })}
      </div>
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
    return <UiLoading />
  }
}

export default Home;
