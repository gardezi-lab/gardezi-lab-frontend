import './style/App.css'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';

import Department from './pages/Dashboard/departments/Departments';

function App() {


  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
