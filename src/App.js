import { Container } from 'react-bootstrap';
import TeaPicker from './components/TeaPicker';
import Topbar from './components/Topbar'
import Teas from './components/Teas';
import Vessels from './components/Vessels';
import Sessions from './components/Sessions';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { TeaProvider } from './contexts/TeaContext';


function App() {
  return (
    <>
      <Container>
        <Topbar />
        <Router>
          <Routes>
            <Route exact path="/" element={<TeaPicker />} />
            <Route path="/teas" element={<Teas />} />
            <Route path="/vessels" element={<Vessels />} />
            <Route path="/sessions" element={<Sessions />} />
          </Routes>
        </Router>
        
      </Container>
      
    </>
  );
}

export default App;
