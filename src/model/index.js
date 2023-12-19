import axios from 'axios';

export default function Connection() {
    const url = process.env.REACT_APP_API_URL;

    const conn = axios.create({
        baseURL: url
    })

    return conn;
}