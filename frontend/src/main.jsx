import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CryptoPage from './CryptoPage.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/:cryptoId',
        element: <CryptoPage />
    },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
