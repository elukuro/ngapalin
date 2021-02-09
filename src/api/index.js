import axios from 'axios';

const API = {
    getSurah:async function() {
        return await axios.get(`http://localhost:3000/api/v1/surat/0/114`).then((response) =>{
            return response.data
        })
    }
}
export default API;