import React, { useState, useEffect,useCallback } from "react";
import API from "./../api/index.js";
import UiLoading from "./../components/Loading";
import UiStep from "./../components/Step";
import UiCard from "./../components/Card";
import {Link} from "react-router-dom"
import "./../styles/container/home.scss";


function Home() {
  const [surahList, setSurahList] = useState();
  const [surah,setSurah] = useState({id:null,count_ayat:null});
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
        <p className="text-center container mx-auto font-extralight text-xl my-10">Pilih surat</p>
        <div className="overflow-scroll	overflow-x-hidden scroll">
          {surahList.map((item) => {
            return(
              <div className="my-5" key={item.surat_name}>
                <UiCard content = {item.surat_name} onClick={(event)=> selectSurah(event,item)}/>
              </div>
            )
          })}
        </div>
        <Link className="arrow mt-4" to={`/surah/${surah.id}/${surah.count_ayat}`}>
          <span className="text-xs font-light mr-4">Selanjutnya</span>
          <img src={`${process.env.PUBLIC_URL}/arrow.png`} alt="arrow" />
        </Link>
      </div>
    )
  } else {
    return <UiLoading />
  }
}

export default Home;
