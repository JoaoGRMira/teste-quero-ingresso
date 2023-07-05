import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../views/Home';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home />}/>
                <Route />
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