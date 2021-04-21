import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:8980/api/v1/roster"
});