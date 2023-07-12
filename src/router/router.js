import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../views/Login/Login';
import Eventos from '../views/Eventos/Eventos';
import Home from '../views/Home/Home';
import Classes from '../views/Classes/Classes';
import Pdv from '../views/PDV/Pdv';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/eventos' element={<Eventos />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/classes' element={<Classes />}/>
                <Route path='/pdv' element={<Pdv />}/>
                <Route />
                <Route />
                <Route />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;