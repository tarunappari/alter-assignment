import { useState } from 'react'
import { GlobalStyles } from './GlobalStyles';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Admin/Pages/Dashboard';
import Formbuilder from './Components/Admin/Pages/Formbuilder';
import FormDetails from './Components/Admin/Pages/FormDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <GlobalStyles />
      <Routes>
        {/* admin routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/create-form" element={<Formbuilder />} />
        <Route path="/admin/form/:id" element={<FormDetails />} />
      </Routes>
    </div>
  )
}

export default App;
