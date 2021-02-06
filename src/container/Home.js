import React, {useState,useEffect} from 'react';
import API from './../api/index.js';

function Home () {
    const [surah, setSurah] = useState(); 
    useEffect(()=>{
        API.getSurah().then(function(result){
            setSurah(result.data)
        });
    })
    if(surah){
       return(
           <p>{JSON.stringify(surah)}</p>
       )
    }else{
        return(
            <p>loading...</p>
        )
    }
    
}

export default Home;