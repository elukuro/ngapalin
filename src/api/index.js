import axios from 'axios';

const API = {
    getSurah:async function() {
        return await axios.get(`/api/v1/surat/0/114`).then((response) =>{
            return response.data
        })
    }
}
export default API;