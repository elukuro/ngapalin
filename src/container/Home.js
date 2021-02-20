import React, { useState, useEffect,useCallback } from "react";
import API from "./../api/index.js";
import UiLoading from "./../components/Loading";
import UiStep from "./../components/Step";
import UiCard from "./../components/Card";
import UiArrow from "./../components/Arrow";

import {Link} from "react-router-dom"
import "./../styles/container/home.scss";


function Home() {
  const [surahList, setSurahList] = useState();
  const [surah,setSurah] = useState({id:null,count_ayat:null,surat_name:null});
  const selectSurah = useCallback(
    (event,item) => {
      event.preventDefault();
      setSurah(item)
    },
    [],
  );
  
  useEffect(() => {
    // get localSurah
    let localSurah  = localStorage.getItem('surah');
    if(!localSurah){
      API.getSurah().then(function (result) {
        setSurahList(result.data);
        localStorage.setItem('surah', JSON.stringify(result.data));
      });
    }else{
      // get surahList form localSurah
      setSurahList(JSON.parse(localSurah));
    }
  },[]);
  if (surahList) {
    return(
      <div className="px-4">
        <UiStep step="1" />
        <p className="text-center container mx-auto font-extralight text-xl my-10">Pilih surat</p>
        <div className="overflow-scroll	overflow-x-hidden scroll">
          {surahList.map((item) => {
            return(
              <div className="my-5" key={item.surat_name}>
                <UiCard active = {surah.surat_name} content = {item.surat_name} onClick={(event)=> selectSurah(event,item)}/>
              </div>
            )
          })}
        </div>
        {surah.id !== null ? <UiArrow to={`/surah/${surah.id}`} type="next" /> :''}
      </div>
    )
  } else {
    return <UiLoading />
  }
}

export default Home;
