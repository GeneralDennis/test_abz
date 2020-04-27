import axios from 'axios'

export default axios.create({
    baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',
    responseType: 'json'
})