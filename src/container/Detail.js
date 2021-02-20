import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import API from "./../api/index.js";
import UiLoading from "./../components/Loading";
import UiStep from "./../components/Step";
import UiCard from "./../components/Card";
import UiArrow from "./../components/Arrow";

import { Link } from "react-router-dom";
import "./../styles/container/home.scss";

function Detail() {
  const [selectedSurah, setSurahList] = useState();
  let { id } = useParams();
  const filter = function (data, payload = id) {
    return data.filter((data) => data.id === parseInt(payload));
  };
  useEffect(() => {
    let localSurah  = localStorage.getItem('surah');
    setSurahList(filter(JSON.parse(localSurah)));
  }, []);
  if (selectedSurah) {
    return (
      <div className="px-4">
        <UiArrow to={"/"} type="prev" text="Kembali pilih surat" />
        <UiStep step="3" />
        <p className="text-center container mx-auto font-extralight text-xl my-5">
          Baca surat <span>{selectedSurah[0].surat_name}</span> ayat <span>{id}</span>
        </p>
        <p className="text-center container mx-auto font-extralight text-xl my-5">
          Ulangi bacaan beberapa kali, tekan ayat untuk menampilkan tafsir
        </p>
        <div className="overflow-scroll	overflow-x-hidden scroll">
          
        </div>
      </div>
    );
  } else {
    return <UiLoading />;
  }
}

export default Detail;
