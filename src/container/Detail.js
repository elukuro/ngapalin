import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import API from "./../api/index.js";
import UiLoading from "./../components/Loading";
import UiStep from "./../components/Step";
import UiArrow from "./../components/Arrow";

function Detail() {
  const [selectedSurah, setSurahList] = useState();
  const [renderSurah,setRenderSurah] = useState();
  const [isHide,setHide] = useState(false);

  let { id,ayat } = useParams();
  const nextAyat = parseInt(ayat)+1;
  const prevAyat = parseInt(ayat) -1;

  const toggleHide = function(isHide) {
    setHide(!isHide)
  };

  const filter = function (data, payload = id) {
    return data.filter((data) => data.id === parseInt(payload));
  };

  useEffect(() => {
    setRenderSurah();
    let localSurah  = localStorage.getItem('surah');
    setSurahList(filter(JSON.parse(localSurah)));
    // render detail surah 
    API.getDetail({id,ayat}).then(function (result) {
      setRenderSurah(result);
    });
  }, [ayat]);

  if (renderSurah) {
    return (
      <div className="px-4">
        <UiArrow to={"/"} type="prev" text="Kembali pilih surat" />
        <UiStep step="3" />
        <p className="text-center container mx-auto font-extralight text-xl my-5">
          Baca surat <span className="font-normal text-gray-700">{selectedSurah[0].surat_name}</span> ayat <span className="font-normal text-gray-700">{ayat}</span>
        </p>
        <p className="text-center container mx-auto font-extralight text-base my-5">
          *Ulangi bacaan beberapa kali
        </p>
        <div className="text-center container mx-auto my-20">
          <p className={`text-4xl ayat text-gray-500 ${(isHide) ? "ayat--blur" : ""}` }>
            {
              renderSurah[0].aya_text
            }
          </p>
          <div className="text-base font-extralight my-5" dangerouslySetInnerHTML={{__html:renderSurah[0].translation_aya_text }}></div>
        </div>
        <div className="container text-center mx-auto my-10">
          <span className={`rounded-full py-3 px-6 ${(isHide) ? "bg-gray-200" : "bg-gray-700 text-white"}`} onClick={()=> toggleHide(isHide)}>
            {isHide ? 'Tampilkan 😊' :'Sembunyikan 😅'}
          </span>
        </div>
        <div className="container mt-20 mb-4 flex justify-between">
          <span className={`${(id !== null && ayat > 1) ? "" : "hide"}`}>
            <UiArrow to={`/surah/${id}/${prevAyat}`} type="prev" text="Ayat Sebelumnya"/>
          </span>
          <span className={`${(id !== null && nextAyat <= parseInt(selectedSurah[0].count_ayat)) ? "" : "hide"}`}>
            <UiArrow to={`/surah/${id}/${nextAyat}`} type="next" text="Ayat Selanjutnya" />
          </span>
        </div>
      </div>
    );
  } else {
    return <UiLoading />;
  }
}

export default Detail;
