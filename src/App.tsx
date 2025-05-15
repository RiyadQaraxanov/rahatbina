import { BrowserRouter } from 'react-router-dom'
const { BASE_URL } = import.meta.env;

function App() {

  return (

    <BrowserRouter
      basename={BASE_URL}
    >

    </BrowserRouter>
  )
}

export default App
