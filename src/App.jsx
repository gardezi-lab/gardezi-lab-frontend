import './style/App.scss'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <>
      <BrowserRouter>
        {/* <AuthProvider> */}
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </>
  )
}

export default App
