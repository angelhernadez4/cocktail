import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useEffect } from 'react'
import { useAppStore } from '../stores/useAppStore';
import Notification from '../components/Notification';
import Footer from '../components/Footer';

function Layout() {
    const loadFromStoreage = useAppStore((state) => state.loadFromStoreage)
    useEffect(() => {
        loadFromStoreage()
    }, [])
    return (
        <>
            <Header />
            <main className='container mx-auto py-16'>
                <Outlet />
            </main>
            <Footer />
            <Modal />
            <Notification />
        </>
    )
}

export default Layout