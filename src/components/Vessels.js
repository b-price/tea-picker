import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import AddVessel from './AddVessel'
import Vessel from './Vessel'
import NavButtons from './NavButtons'

export default function Vessels(){
    const [showAddVessel, setShowAddVessel] = useState(false)

    function openAddVesselModal() {
        setShowAddVessel(true)
    }

    return(
        <>
            <Card >
                <Card.Header as="h2">
                    Vessels
                    <NavButtons 
                        button1="Home"
                        button2="Teas"
                        button3="Sessions"
                    />
                </Card.Header>
                <Card.Body>
                    <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
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