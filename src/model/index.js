import axios from "axios";

export default function Connection() {
    const url = process.env.REACT_APP_DATABASE_URL;
    const conn = axios.create({
        baseURL: url,
    });

    return conn;
}

// VERSÃO 1.0.1
// DATA DE LIBERAÇÃO: 28/02/2024