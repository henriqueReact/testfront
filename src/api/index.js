import axios from "axios"

const api = axios.create({
    //baseURL: 'https://sheltered-escarpment-43070.herokuapp.com'
    baseURL: 'https://blooming-savannah-96568.herokuapp.com'
})

export default api