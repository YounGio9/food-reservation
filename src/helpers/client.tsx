import axios from 'axios'

const client = axios.create({
   baseURL: 'https://mtd.eigroup.com/api',
})

export default client
