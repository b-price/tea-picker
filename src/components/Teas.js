import { Button, Card } from 'react-bootstrap'
import Tea from './Tea'
import AddTea from './AddTea'
import NavButtons from './NavButtons'
import { useState } from 'react'

export default function Teas(){
    const [showAddTea, setShowAddTea] = useState(false)

    function openAddTeaModal() {
        setShowAddTea(true)
    }

    return(
        <>
            <Card>
                <Card.Header as="h2">
                    Teas
                    <NavButtons 
                        button1="Home"
                        button2="Sessions"
                        button3="Vessels"
                    />
                </Card.Header>
                <Card.Body>
                    <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                        <Tea />
                        <Tea />
                        <Tea />
                        <Tea />
                        <Tea />
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={() => openAddTeaModal()}>
                        Add Tea
                    </Button>
                </Card.Footer>
            </Card>
            <AddTea show={showAddTea} handleClose={() => setShowAddTea(false)} />
        </>
    )
}