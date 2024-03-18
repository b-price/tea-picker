import logo from './logo.svg';
import { Container } from 'react-bootstrap';
import TeaPicker from './components/TeaPicker';
import Topbar from './components/Topbar'


function App() {
  return (
    <>
      <Container>
        <Topbar />
        <TeaPicker />
      </Container>
      
    </>
  );
}

export default App;
