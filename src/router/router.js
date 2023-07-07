import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../views/Login';
import Home from '../views/Home';
import Home2 from '../views/Home2';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/home2' element={<Home2 />}/>
                <Route />
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