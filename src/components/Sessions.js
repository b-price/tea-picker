import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import AddSession from './AddSession'
import AddTea from './AddTea'
import Session from './Session'
import AddVessel from './AddVessel'
import NavButtons from './NavButtons'

export default function Sessions(){
    const [showAddTea, setShowAddTea] = useState(false)
    
    function openAddTeaModal() {
        setShowAddTea(true)
    }
    const [showAddSession, setShowAddSession] = useState(false)
    function openAddSessionModal() {
        setShowAddSession(true)
    }
    const [showAddVessel, setShowAddVessel] = useState(false)
    function openAddVesselModal() {
        setShowAddVessel(true)
    }

    return(
        <>
            <Card>
                <Card.Header as="h2">
                    Sessions
                    <NavButtons 
                        button1="Home"
                        button2="Teas"
                        button3="Vessels"
                    />
                </Card.Header>
                <Card.Body>
                    <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
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
            <AddSession 
                show={showAddSession} 
                handleClose={() => setShowAddSession(false)} 
                openAddTeaModal={() => openAddTeaModal()} 
                openAddVesselModal={() => openAddVesselModal()}
            />
            <AddTea show={showAddTea} handleClose={() => setShowAddTea(false)} />
            <AddVessel show={showAddVessel} handleClose={() => setShowAddVessel(false)} />
        </>
    )
}