import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './layouts/Landing';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App