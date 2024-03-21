import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AddSession from './AddSession'
import AddTea from './AddTea'
import Session from './Session'

export default function Sessions(){
    const [showAddTea, setShowAddTea] = useState(false)
    const navigate = useNavigate()
    function openAddTeaModal() {
        setShowAddTea(true)
    }
    const [showAddSession, setShowAddSession] = useState(false)
    function openAddSessionModal() {
        setShowAddSession(true)
    }
    function handlePage(path) {
        navigate(path)
    }
    var mobile = window.matchMedia("(max-width: 420px)").matches
    console.log(mobile)
    return(
        <>
            <Card>
                <Card.Header as="h2">
                    Sessions
                    <Button 
                        variant="outline-primary" 
                        onClick={() => handlePage("/teas")} 
                        className="me-2 float-end"
                        size={mobile? "sm" : undefined}
                    >
                        Teas
                    </Button>
                    <Button variant="outline-primary" onClick={() => handlePage("/vessels")} className="me-2 float-end" size="sm">
                        Vessels
                    </Button>
                    <Button variant="outline-primary" onClick={() => handlePage("/")} className="me-2 float-end" size="sm">
                        Home
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                    </div>
                </Card.Body>
                <Card.Footer>
                <Button variant="primary" onClick={() => openAddSessionModal()}>
                    Add Session
                </Button>
                </Card.Footer>
            </Card>
            <AddSession show={showAddSession} handleClose={() => setShowAddSession(false)} openAddTeaModal={() => openAddTeaModal()} />
            <AddTea show={showAddTea} handleClose={() => setShowAddTea(false)} />
        </>
    )
}