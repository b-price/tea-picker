import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Tea from './Tea'
import AddTea from './AddTea'
import { useState } from 'react'

export default function Teas(){
    const [showAddTea, setShowAddTea] = useState(false)
    const navigate = useNavigate()
    function openAddTeaModal() {
        setShowAddTea(true)
    }
    function handlePage(path) {
        navigate(path)
    }
    
    return(
        <>
            <Card>
                <Card.Header as="h2">
                    Teas
                    <Button variant="outline-primary" onClick={() => handlePage("/sessions")} className="me-2 float-end">
                        Sessions
                    </Button>
                    <Button variant="outline-primary" onClick={() => handlePage("/vessels")} className="me-2 float-end">
                        Vessels
                    </Button>
                    <Button variant="outline-primary" onClick={() => handlePage("/")} className="me-2 float-end">
                        Home
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
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