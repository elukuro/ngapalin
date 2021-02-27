// import axios from 'axios';
let suratList = require('./quran/list.json');

const API = {
    getSurah:async function() {
        // return await axios.get(`/api/v1/surat/0/114`).then((response) =>{
        //     return response.data
        // })
        return suratList
    },
    getDetail: async function (params) {
        // return await axios.get(`/api/v1/ayatweb/${params.id}/${params.ayat}/0/1`).then((response)=>{
        //     return response.data
        // })
        let surat = require(`./quran/surat/${params.id}`);
        return surat.data.filter((item)=> item.aya_number === parseInt(params.ayat))
    }
}
export default API;