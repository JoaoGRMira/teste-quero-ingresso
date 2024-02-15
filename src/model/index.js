import axios from 'axios';

export default function Connection() {
    const url = 'https://api-promo-server.onrender.com/';

    const conn = axios.create({
        baseURL: url
    })

    return conn;
}