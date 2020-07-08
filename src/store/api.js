import axios from 'axios'

export default axios.create({
    baseURL: `http://www.angular_laravel.com`,
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
    }
 })