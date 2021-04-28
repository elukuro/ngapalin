import React, { useState, useEffect, useCallback } from "react";
import {useSwipeable} from "react-swipeable";

import { useParams,useHistory } from "react-router-dom";

import API from "./../api/index.js";
import UiLoading from "./../components/Loading";
import UiStep from "./../components/Step";
import UiArrow from "./../components/Arrow";
import UiModal from "./../components/Modal";
import UiCard from "./../components/Card";

function Detail() {
  const [selectedSurah, setSurahList] = useState();
  const [renderSurah,setRenderSurah] = useState();
  const [isHide,setHide] = useState(false);
  const [isShowModal,setModal] = useState(false);
  const [isSwipping,setSwipping] = useState('');
  const [fontSize,setFontSize] = useState('md');

  let { id,ayat } = useParams();
  let history = useHistory();
  const nextAyat = parseInt(ayat)+1;
  const prevAyat = parseInt(ayat) -1;

  const toggleHide = function(isHide) {
    setHide(!isHide)
  };

  const filter = function (data, payload = id) {
    return data.filter((data) => data.id === parseInt(payload));
  };

  const saveLatestOpen = function() {
    localStorage.setItem('latest',`${id}/${ayat}`);
  };

  const gotoAyat = function (payload) {
    setModal(false)
    history.push(`/surah/${id}/${payload}`)
  };

  useEffect(() => {
    setRenderSurah();
    API.getSurah().then(function (result) {
      setSurahList(filter(result.data));
    })
    // render detail surah 
    API.getDetail({id,ayat}).then(function (result) {
      setRenderSurah(result);
      saveLatestOpen();
    });
  }, [ayat]);
  const config = {
    delta: 20,                            // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
    trackTouch: true,                     // track touch input
    trackMouse: false,                    // track mouse input
  }
  const handlers = useSwipeable({ 
    onSwipedLeft: () => {
      setSwipping('');
      if((id !== null && nextAyat <= parseInt(selectedSurah[0].count_ayat))){ 
        history.push(`/surah/${id}/${nextAyat}`)
      }
    },
    onSwipedRight: () => {
      setSwipping('');
      if(id !== null && ayat > 1){
        history.push(`/surah/${id}/${prevAyat}`)
      }
    },
    onSwiping:(evenData)=> {
      setSwipping(evenData.dir)
    },
    ...config
  })
  if (renderSurah) {
    return (
      <div
        className={`${(isShowModal) ? 'overflow-hidden max-h-96':''} px-4`}
      >
        <UiModal open={isShowModal} close={()=>setModal(false)} title="Pilih ayat">
          <div className="container mx-auto overflow-scroll	overflow-x-hidden scroll">
            {
              [...Array(parseInt(selectedSurah[0].count_ayat)).keys()].map((num)=> {
                return(
                  <div className="" key={num+1}>
                    <UiCard active = {`Ayat ${ayat}`} content = {`Ayat ${num +1}`} onClick={()=> gotoAyat(num+1)}/>
                  </div>
                )
              })
            }
          </div>
        </UiModal>
        <UiArrow to={"/"} type="prev" text="Kembali pilih surat" />
        <div
          className={`
          ${(isShowModal) ? 'overflow-hidden max-h-96':''} px-4 transition-all duration-200 ease-in-out 
          ${(isSwipping === 'Left') ? 'transform opacity-20  -translate-x-20':''}
          ${(isSwipping === 'Right') ? 'transform opacity-20  translate-x-20':''}
          `}
          {...handlers}
        >
          <UiStep step="3" />
          <p className="text-center container mx-auto font-extralight text-xl my-5 dark:text-gray-200">
            Baca surat <span className="font-normal text-gray-700 dark:text-gray-200">{selectedSurah[0].surat_name} </span>
            <span className="underline" onClick={()=>setModal(true)}>Ayat <span className="font-normal text-gray-700 dark:text-gray-200">{ayat}</span></span>
          </p>
          <p className="text-center container mx-auto font-extralight text-base my-5 dark:text-gray-200">
            *Ulangi bacaan beberapa kali, swipe untuk berpindah ayat
          </p>
          <div className="text-center container mx-auto my-10">
            <div className="flex my-6 justify-end">
              <span
                className={` ${(fontSize === "sm") ? "bg-gray-700 text-white dark:bg-gray-900 dark:text-gray-100": "bg-gray-300"} text-xs font-extralight rounded-full h-6 w-6 flex items-center justify-center mr-1`}
                onClick={()=>setFontSize('sm')}
              >
                A
              </span>
              <span
                className={` ${(fontSize === "md") ? "bg-gray-700 text-white dark:bg-gray-900 dark:text-gray-100": "bg-gray-300"} text-base font-extralight rounded-full h-6 w-6 flex items-center justify-center mr-1`}
                onClick={()=>setFontSize('md')}
              >
                A
              </span>
              <span
                className={` ${(fontSize === "xl") ? "bg-gray-700 text-white dark:bg-gray-900 dark:text-gray-100": "bg-gray-300"} text-xl	 font-extralight rounded-full h-6 w-6 flex items-center justify-center`}
                onClick={()=>setFontSize('xl')}
              >
                A
              </span>
            </div>
            <p className={`${(fontSize ==='sm') ? "text-xl" : (fontSize === 'md') ? "text-2xl" :"text-4xl"} ayat text-gray-500 dark:text-gray-300 ${(isHide) ? "ayat--blur" : ""}` }>
              {
                renderSurah[0].aya_text
              }
            </p>
            <div className="text-base font-extralight my-5 dark:text-gray-200" dangerouslySetInnerHTML={{__html:renderSurah[0].translation_aya_text }}></div>
          </div>
          <div className="container text-center mx-auto my-10">
            <span className={`rounded-full py-3 px-6 ${(isHide) ? "bg-gray-200" : "bg-gray-700 text-white dark:bg-gray-900 dark:text-gray-200 "}`} onClick={()=> toggleHide(isHide)}>
              {isHide ? 'Tampilkan 😊' :'Sembunyikan 😅'}
            </span>
          </div>
          <div className="container mt-20 mb-4 flex justify-between">
          {/* <span className={`${(id !== null && ayat > 1) ? "" : "hide"}`}>
            <UiArrow to={`/surah/${id}/${prevAyat}`} type="prev" text="Ayat Sebelumnya"/>
          </span>
          <span className={`${(id !== null && nextAyat <= parseInt(selectedSurah[0].count_ayat)) ? "" : "hide"}`}>
            <UiArrow to={`/surah/${id}/${nextAyat}`} type="next" text="Ayat Selanjutnya" />
          </span> */}
        </div>
        </div>
      </div>
    );
  } else {
    return <UiLoading />;
  }
}

export default Detail;
