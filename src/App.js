import { Container } from 'react-bootstrap';
import TeaPicker from './components/TeaPicker';
import Topbar from './components/Topbar'
// import { TeaProvider } from './contexts/TeaContext';


function App() {
  return (
    <>
      <Container>
        <Topbar />
        {/* <TeaProvider> */}
          <TeaPicker />
        {/* </TeaProvider> */}
      </Container>
      
    </>
  );
}

export default App;
