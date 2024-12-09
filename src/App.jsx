import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Generate from './pages/Generate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/generate' element={<Generate />}/>
    </Routes>
  );
}

export default App;