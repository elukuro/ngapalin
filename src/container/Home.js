import React, { useState, useEffect,useCallback } from "react";
import API from "./../api/index.js";
import UiLoading from "./../components/Loading";
import UiStep from "./../components/Step";
import UiCard from "./../components/Card";
import UiArrow from "./../components/Arrow";

import {Link} from "react-router-dom"


function Home() {
  const [surahList, setSurahList] = useState();
  const [surah,setSurah] = useState({id:null,count_ayat:null,surat_name:null});
  const latestOpen = localStorage.getItem('latest');
  const selectSurah = useCallback(
    (event,item) => {
      event.preventDefault();
      setSurah(item)
    },
    [],
  );
  
  useEffect(() => {
      API.getSurah().then(function (result) {
        setSurahList(result.data);
      });
   },[]);
  if (surahList) {
    return(
      <div className="px-4">
        <UiStep step="1" />
        <p className="text-center container mx-auto font-extralight text-xl my-10 dark:text-gray-200">Pilih surat</p>
        <div className="overflow-scroll	overflow-x-hidden scroll">
          {surahList.map((item) => {
            return(
              <div className="my-5" key={item.surat_name}>
                <UiCard active = {surah.surat_name} content = {item.surat_name} onClick={(event)=> selectSurah(event,item)}/>
              </div>
            )
          })}
        </div>
        <div className="bottom">
          {surah.id !== null ? <UiArrow to={`/surah/${surah.id}`} type="next" /> :''}
          {(latestOpen && surah.id === null) ? <UiArrow to={`/surah/${latestOpen}`} type="next" text="Ke terakhir dibuka" /> :''}
        </div>
      </div>
    )
  } else {
    return <UiLoading />
  }
}

export default Home;
