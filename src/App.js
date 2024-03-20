import { Container } from 'react-bootstrap';
import TeaPicker from './components/TeaPicker';
import Topbar from './components/Topbar'
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
          </Routes>
        </Router>
        
      </Container>
      
    </>
  );
}

export default App;
