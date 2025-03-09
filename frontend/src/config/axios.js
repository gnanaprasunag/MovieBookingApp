import axios from 'axios'
//we can create axios configuration object
export default axios.create({
    baseURL:'http://localhost:9213'
})