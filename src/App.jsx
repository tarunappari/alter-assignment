import { useState } from 'react'
import { GlobalStyles } from './GlobalStyles';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Admin/Pages/Dashboard';
import Formbuilder from './Components/Admin/Pages/Formbuilder';
import FormDetails from './Components/Admin/Pages/FormDetails';
import LandingPage from './Components/Website/Pages/LandingPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ContactPage from './Components/Website/Pages/ContactPage';
import HomePage from './Components/Website/Pages/HomePage';
import AboutPage from './Components/Website/Pages/AboutPage';
import ServicesPage from './Components/Website/Pages/ServicesPage';

function App() {

  return (
    <div>
      <GlobalStyles />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* admin routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/create-form" element={<Formbuilder />} />
        <Route path="/admin/create-form/:formId" element={<Formbuilder />} />
        <Route path="/admin/form-detail/:formId" element={<FormDetails />} />

        {/* Webpage Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path='/contact' element={ <ContactPage /> } />
        <Route path='/services' element={ <ServicesPage /> } />
        <Route path='/about' element={ <AboutPage /> } />
        <Route path='/home' element={ <HomePage /> } />
      </Routes>
    </div>
  )
}

export default App;
