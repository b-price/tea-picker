import { useState } from 'react'
import {Card, Button, Dropdown} from 'react-bootstrap'
import Vessel from './Vessel.js'
import NavButtons from './NavButtons.js'
import Add from "./Add.js";
import {useVessels} from "../contexts/VesselContext.js";

export default function Vessels(){
    const [showAddVessel, setShowAddVessel] = useState(false)
    const {vessels, addVessel, deleteVessel, editVessel, sortVessels} = useVessels()
    function openAddVesselModal() {
        setShowAddVessel(true)
    }
    
    let rows = []
    if (vessels) {
        vessels.forEach(vessel => {
            rows.push(
                <Vessel
                    name={vessel.name}
                    type={vessel.type}
                    vendor={vessel.vendor}
                    capacity={vessel.capacity}
                    favorite={vessel.favorite}
                    exclude={vessel.exclude}
                    disallowed={vessel.disallowed}
                    preferred={vessel.preferred}
                    id={vessel._id}
                    key={vessel._id}
                    deleteFunction={deleteVessel}
                    editFunction={editVessel}
                    buttons={true}
                />
            )
        })
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
                        {rows}
                    </div>
                </Card.Body>
                <Card.Footer>
                <Button variant="primary" onClick={() => openAddVesselModal()}>
                    Add Vessel
                </Button>
                    <Dropdown className={"float-end"}>
                        <Dropdown.Toggle variant={"outline-primary"}>Sort by...</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => sortVessels("date")}>Date Added</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortVessels("name")}>Name</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortVessels("type")}>Type</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortVessels("capacity")}>Capacity</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortVessels("vendor")}>Vendor</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortVessels("favorite")}>Favorite</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortVessels("exclude")}>Excluded</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Footer>
            </Card>
            <Add show={showAddVessel} handleClose={() => setShowAddVessel(false)} add={addVessel} type={"vessel"}/>
        </>
    )
}