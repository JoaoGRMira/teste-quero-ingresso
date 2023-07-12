import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../views/Login/Login';
import Eventos from '../views/Eventos/Eventos';
import Home from '../views/Home/Home';
import Classes from '../views/Classes/Classes';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/eventos' element={<Eventos />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/classes' element={<Classes />}/>
                <Route />
                <Route />
                <Route />
                <Route />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;