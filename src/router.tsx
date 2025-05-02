import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './layouts/Layout'
import { Suspense, lazy } from 'react';
import GenerateAI from './views/GeneratiIA';

const IndexPage = lazy(() => import('./views/IndexPage'))
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))
function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={
                        <Suspense fallback="Cargando...">
                            <IndexPage />
                        </Suspense>
                    } index />
                    <Route path='/favorites' element={
                        <Suspense fallback="Cargando...">
                            <FavoritesPage />
                        </Suspense>
                    } />
                    <Route path='/generate' element={
                        <Suspense fallback="Cargando...">
                            <GenerateAI />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter