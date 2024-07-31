import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "./teapickerlogo.png"
import settings from "./SettingsWhite.png"
import { Link } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.js";

export default function Topbar() {
  const {loggedIn} = useAuth()
  return (
    <>
      <Navbar>
        <Container>
            <Nav>
              <Link to={"/"}><img src={logo} alt="logo" width={50} height={50} className="mb-2 me-3" /></Link>
              <Link to={"/"} className="h1 m-0 mt-1 link-underline link-underline-opacity-0">Tea Picker</Link>
            </Nav>
            {loggedIn? (
                <Link to={"/settings"}><img src={settings} alt="settings" width={45} height={45}  /></Link>
            ) : (
                <></>
            )}
        </Container>
      </Navbar>
    </>
  )
}