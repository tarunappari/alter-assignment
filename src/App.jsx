import { useState } from 'react'
import { GlobalStyles } from './GlobalStyles';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Admin/Pages/Dashboard';
import Formbuilder from './Components/Admin/Pages/Formbuilder';
import FormDetails from './Components/Admin/Pages/FormDetails';
import LandingPage from './Components/Website/LandingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <GlobalStyles />
      <Routes>
        {/* admin routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/create-form" element={<Formbuilder />} />
        <Route path="/admin/form-detail/:formId" element={<FormDetails />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  )
}

export default App;
