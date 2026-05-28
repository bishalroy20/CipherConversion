import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './Components/RootLayout.jsx'
import Home from './Components/Home.jsx'
import CaesarPage from './Convert/caesarPage.jsx'
import PlayfairPage from './Convert/PlayfairPage.jsx'
import VigenerePage from './Convert/VigenerePage.jsx'
import About from './Components/About.jsx'
import Contact from './Components/Contact.jsx'
import HillCipherPage from './Convert/HillCipherPage.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about" , element: <About /> },
      // { path: "/contact" , element: <Contact /> },
      { path: "/caesar", element: <CaesarPage/> },
      { path: "/playfair", element: <PlayfairPage /> },
      { path: "/vigenere", element: <VigenerePage /> },
      { path: "/hill", element: <HillCipherPage /> },
      

    ]}

    ])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
