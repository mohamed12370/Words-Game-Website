import './App.css';
import { Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './Component/Home';
import End from './Component/End';
import Gard from './Component/Gard';
import Start from './Component/Start';

function App() {
  return (
    <div className="container mx-auto px-6">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/home"
          element={
            <Gard>
              <Home />{' '}
            </Gard>
          }
        />
        <Route
          path="/end"
          element={
            <Gard>
              {' '}
              <End />{' '}
            </Gard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
