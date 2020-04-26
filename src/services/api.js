import axios from 'axios';


const api = axios.create({
    baseURL: 'http://cdc-react.herokuapp.com/api/',
    headers: {
        "Content-type": "application/json", 
        // "Authorization": "Token 314b84be983f8d5d21d32bb83909b79239e58194" 
    }
})

// axios.interceptors.response.use((response) => {
//     return response;
// }, function (error) {
//     // Do something with response error
//     if (error.response.status === 401) {
//         new TrataDados().publicaErros(response.responseJSON);
//     }
//     return Promise.reject(error.response);
// });

export default api ;