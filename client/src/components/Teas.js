import { Button, Card } from 'react-bootstrap'
import Tea from './Tea.js'
import NavButtons from './NavButtons.js'
import { useState } from 'react'
import {useTea} from "../contexts/TeaContext.js";
import Add from "./Add.js";

export default function Teas(){
    const [showAddTea, setShowAddTea] = useState(false)
    const {teas, addTea, deleteTea, editTea} = useTea()

    function openAddTeaModal() {
        setShowAddTea(true)
    }

    let rows = []
    teas.forEach(tea => {
        rows.push(
            <Tea
                name={tea.name}
                type={tea.type}
                vendor={tea.vendor}
                cost={tea.cost}
                quantity={tea.quantity}
                rating={tea.rating}
                year={tea.year}
                ratio={tea.ratio}
                id={tea._id}
                key={tea._id}
                deleteTea={deleteTea}
                buttons={true}
            />
        )
    })

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
                        {rows}
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={() => openAddTeaModal()}>
                        Add Tea
                    </Button>
                </Card.Footer>
            </Card>
            <Add show={showAddTea} handleClose={() => setShowAddTea(false)} add={addTea} type={"tea"}/>
        </>
    )
}