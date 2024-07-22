import {Button, Card, Dropdown} from 'react-bootstrap'
import Tea from './Tea.js'
import NavButtons from './NavButtons.js'
import {useState} from 'react'
import {useTea} from "../contexts/TeaContext.js";
import Add from "./Add.js";

export default function Teas(){
    const [showAddTea, setShowAddTea] = useState(false)
    const {teas, addTea, deleteTea, editTea, sortTea} = useTea()
    function openAddTeaModal() {
        setShowAddTea(true)
    }

    let rows = []
    if (teas) {
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
                    editTea={editTea}
                    buttons={true}
                />
            )
        })
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
                        {rows}
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={() => openAddTeaModal()}>
                        Add Tea
                    </Button>
                    <Dropdown className={"float-end"}>
                        <Dropdown.Toggle variant={"outline-primary"}>Sort by...</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => sortTea("date")}>Date Added</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortTea("name")}>Name</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortTea("type")}>Type</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortTea("quantity")}>Quantity</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortTea("vendor")}>Vendor</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortTea("cost")}>Cost</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortTea("rating")}>Rating</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortTea("year")}>Year</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortTea("ratio")}>Ratio</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Footer>
            </Card>
            <Add show={showAddTea} handleClose={() => setShowAddTea(false)} add={addTea} type={"tea"}/>
        </>
    )
}