import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AddVessel from './AddVessel'
import Vessel from './Vessel'

export default function Vessels(){
    const [showAddVessel, setShowAddVessel] = useState(false)
    const navigate = useNavigate()
    function openAddVesselModal() {
        setShowAddVessel(true)
    }
    function handlePage(path) {
        navigate(path)
    }
    return(
        <>
            <Card >
                <Card.Header as="h2">
                    Vessels
                    <Button variant="outline-primary" onClick={() => handlePage("/teas")} className="me-2 float-end">
                        Teas
                    </Button>
                    <Button variant="outline-primary" onClick={() => handlePage("/sessions")} className="me-2 float-end">
                        Sessions
                    </Button>
                    <Button variant="outline-primary" onClick={() => handlePage("/")} className="me-2 float-end">
                        Home
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <Vessel />
                        <Vessel />
                        <Vessel />
                        <Vessel />
                    </div>
                </Card.Body>
                <Card.Footer>
                <Button variant="primary" onClick={() => openAddVesselModal()}>
                    Add Vessel
                </Button>
                </Card.Footer>
            </Card>
            <AddVessel show={showAddVessel} handleClose={() => setShowAddVessel(false)} />
        </>
    )
}