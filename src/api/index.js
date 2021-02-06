import axios from 'axios';

const API = {
    getSurah:async function() {
        return await axios.get('https://api.quran.sutanlab.id/surah').then((response) =>{
            return response.data
        })
    }
}
export default API;