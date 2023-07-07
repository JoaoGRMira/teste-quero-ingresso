import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../views/Login';
import Eventos from '../views/Eventos';
import Home from '../views/Home';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/eventos' element={<Eventos />}/>
                <Route />
                <Route />
                <Route />
                <Route />
                <Route />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;