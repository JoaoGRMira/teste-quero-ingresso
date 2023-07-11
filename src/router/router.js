import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../views/Login/Login';
import Eventos from '../views/Eventos/Eventos';
import Home from '../views/Home/Home';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/eventos' element={<Eventos />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/eventos' element={<Eventos />}/>
                <Route />
                <Route />
                <Route />
                <Route />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;