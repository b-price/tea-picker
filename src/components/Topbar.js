import Container from "react-bootstrap/Container"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "./teapickerlogo.png"

export default function Topbar() {
  return (
    <>
      <Navbar>
        <Container>
          <Nav className="me-auto">
            <img src={logo} alt="logo" width={50} height={50}/>
            <h1>Tea Picker</h1>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}