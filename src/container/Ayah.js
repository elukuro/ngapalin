import React, { useState, useEffect, useCallback } from "react";
import {useParams} from "react-router-dom";
import API from "./../api/index.js";
import UiLoading from "./../components/Loading";
import UiStep from "./../components/Step";
import UiCard from "./../components/Card";
import UiArrow from "./../components/Arrow";


function Ayah() {
  let {id} = useParams();
  const filter = function(data,payload = id) {
    return data.filter(data=> data.id === parseInt(payload))
  }
  const RenderSurah = useCallback(
    (event,item) => {
      event.preventDefault();
      setAyat(item);
    },
    [],
  );
  const [selectedSurah, setSurahList] = useState();
  const [ayat,setAyat] = useState(null);
  useEffect(()=>{
    API.getSurah().then(function (result) {
      setSurahList(filter(result.data));
    })
  },[]);

  if (selectedSurah) {
  return(
    <div className="px-4">
      <UiStep step="2" />
      <p className="text-center container mx-auto font-extralight text-xl my-10">
        Surat <span className="">{selectedSurah[0].surat_name}</span>
      </p>
      {/* <p className="text-center container mx-ahto font-extralight text-xl my-10">Pilih Ayat</p> */}
      <div className="overflow-scroll	overflow-x-hidden scroll">
      {
        [...Array(parseInt(selectedSurah[0].count_ayat)).keys()].map((num)=> {
          return(
            <div className="" key={num+1}>
              <UiCard active = {`Ayat ${ayat}`} content = {`Ayat ${num +1}`} onClick={(event)=> RenderSurah(event,num+1)}/>
            </div>
          )
        })
      }
      </div>
      <div className="bottom container flex justify-between">
        <UiArrow to={'/'} type="prev"/>
        {ayat !== null ? <UiArrow to={`/surah/${id}/${ayat}`} type="next" /> :''}
      </div>
    </div>
  )
  }else{
    return <UiLoading />
  }
}

export default Ayah;
