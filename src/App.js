import logo from './logo.svg';
import { Container } from 'react-bootstrap';
import TeaPicker from './components/TeaPicker';


function App() {
  return (
    <>
      <Container>
        <h1>Tea Picker</h1>
        <TeaPicker />
      </Container>
      
    </>
  );
}

export default App;
