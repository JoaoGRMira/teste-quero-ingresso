import axios from 'axios';

export default function Connection() {
    const url = 'http://apiserverqi.mfhosting.com.br:3000/';

    const conn = axios.create({
        baseURL: url
    })

    return conn;
}