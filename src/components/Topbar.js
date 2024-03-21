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
            <Nav>
              <img src={logo} alt="logo" width={50} height={50} className="mb-2 me-3" />
              <h1 className="m-0 mt-1">Tea Picker</h1>
            </Nav>
            
            <img src={settings} alt="settings" width={45} height={45}  />
          
        </Container>
      </Navbar>
    </>
  )
}