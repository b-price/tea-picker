import { Button, Container, Row, Card, Form, Col, Modal } from "react-bootstrap";
import NavButtons from "./NavButtons.js";
import { useState } from "react";
import {useAuth} from "../contexts/AuthContext.js";
import {useNavigate} from "react-router-dom";

export default function Settings() {
    const {logout, deleteAccount, updateSettings, resetPassword, updateEmail, user} = useAuth()
    const navigate = useNavigate()
    const [showAreYouSure, setShowAreYouSure] = useState(false)
    function openAreYouSure() {
        setShowAreYouSure(true)
    }
    const [settings, setSettings] = useState(user.settings)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const [isDark, setIsDark] = useState(false)
    const setTheme = isDark => {
        var theme = isDark? "dark" : "light"
        document.documentElement.setAttribute('data-bs-theme', theme)
    }
    function onLogout(){
        logout()
        navigate("/")
    }
    function onDeleteAccount(){
        deleteAccount()
        setShowAreYouSure(false)
        navigate("/")
    }
    function onFavoriteSwitch(){
        setSettings({...settings, favoriteMode: !settings.favoriteMode})
        updateSettings(settings)
    }
    function onDarkSwitch(){
        setSettings({...settings, darkMode: !settings.darkMode})
        updateSettings(settings)
    }
    function onUpdateEmail(){
        updateEmail(email)
    }
    function onResetPassword(){
        if (password === passwordConfirm){
            resetPassword(password)
        } else {

        }
    }
    function handleEmailChange(event){
        setEmail(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    function handlePasswordConfirm(event){
        setPasswordConfirm(event.target.value)
    }

    function AreYouSure({openAreYouSure, onClose}) {
        return(
            <Modal show={openAreYouSure} onHide={onClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This will PERMANENTLY delete your account!</p>
                    <p>If you're sure, enter your password.</p>
                    <Form>
                        <Form.Control type="password" className="mb-3"/>
                        <Button type="submit" variant="danger" onClick={onDeleteAccount}>DELETE ACCOUNT</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

        return(
            <Container>
                <Card>
                    <Card.Header as="h3">
                        Settings
                        <Button variant="outline-primary" className="float-end">Back</Button>
                    </Card.Header>
                    <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                        <Card.Header as="h5">Tea Settings</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="favoriteOnly">
                                    <Form.Check
                                        type="switch"
                                        label="Use only favorite vessel"
                                        checked={settings.favoriteMode}
                                        onChange={onFavoriteSwitch}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Header as="h5">Account Settings</Card.Header>
                        <Card.Body>

                            <Form.Check
                                id="modeSwitch"
                                type="switch"
                                label="Dark mode"
                                className="mb-3"
                                checked={settings.darkMode}
                                onChange={onDarkSwitch}
                            />

                            <Form>
                                <Row className="align-items-end mb-4">
                                    <Form.Group as={Col} controlId="updateEmail" className="col-7 col-sm-6">
                                        <Form.Label>Update email</Form.Label>
                                        <Form.Control type="email" value={email} onChange={handleEmailChange} />
                                    </Form.Group>
                                    <Col>
                                        <Button variant="secondary" onClick={onUpdateEmail}>Update</Button>
                                    </Col>

                                </Row>
                            </Form>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="updatePassword">
                                        <Form.Label>Update password</Form.Label>
                                        <Form.Control type="password" value={password} onChange={handlePasswordChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="updatePasswordConfirm">
                                        <Form.Label>Confirm password</Form.Label>
                                        <Form.Control type="password" value={passwordConfirm} onChange={handlePasswordConfirm}/>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Button variant="secondary" onClick={onResetPassword} className="">Update Password</Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Row className="my-5">
                                <Col>
                                    <Button variant="danger" onClick={() => openAreYouSure()}>Delete Account</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </div>
                    <Card.Footer>
                        <Button variant="primary" onClick={onLogout}>Logout</Button>
                    </Card.Footer>
                </Card>
                <AreYouSure openAreYouSure={showAreYouSure} onClose={() => setShowAreYouSure(false)} />
            </Container>
        )
}