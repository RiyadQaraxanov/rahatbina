import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '@/routes/AppRoutes';
const { BASE_URL } = import.meta.env;

function App() {

  return (

    <BrowserRouter
      basename={BASE_URL}
    >
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
