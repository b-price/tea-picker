import { Container } from 'react-bootstrap';
import TeaPicker from './components/TeaPicker.js';
import Topbar from './components/Topbar.js'
import Teas from './components/Teas.js';
import Vessels from './components/Vessels.js';
import Sessions from './components/Sessions.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Settings from './components/Settings.js';
import { TeaProvider } from './contexts/TeaContext.js';
import {VesselProvider} from "./contexts/VesselContext.js";
import {SessionProvider} from "./contexts/SessionContext.js";


function App() {
  return (
    <>
      <Container> 
        <Router>
        <Topbar />
          <TeaProvider>
            <VesselProvider>
              <SessionProvider>
                <Routes>
                  <Route exact path="/" element={<TeaPicker />} />
                  <Route path="/teas" element={<Teas />} />
                  <Route path="/vessels" element={<Vessels />} />
                  <Route path="/sessions" element={<Sessions />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </SessionProvider>

            </VesselProvider>

          </TeaProvider>

        </Router>
        
      </Container>
      
    </>
  );
}

export default App;
