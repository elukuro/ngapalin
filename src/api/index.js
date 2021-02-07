import axios from 'axios';

const API = {
    getSurah:async function() {
        return await axios.get(`${process.env.REACT_APP_API_URL}/surah`).then((response) =>{
            return response.data
        })
    }
}
export default API;