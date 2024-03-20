import Container from "react-bootstrap/Container"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "./teapickerlogo.png"
import settings from "./SettingsWhite.png"

export default function Topbar() {
  return (
    <>
      <Navbar>
        <Container>
          <Nav className="me-auto">
            <img src={logo} alt="logo" width={50} height={50}/>
            <h1 className="mx-3">Tea Picker</h1>
            <img src={settings} alt="settings" width={40} height={40} className="mx-1"/>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}