import { ListGroup, Button } from "react-bootstrap"
import TeaStat from './TeaStat.js'
import EditDeleteButtons from "./EditDeleteButtons.js"

export default function Vessel({buttons = true}){
    return (
        <>
            <ListGroup horizontal={"lg"}>
                <TeaStat category={"Name"} data={"Small Gaiwan"}/>
                <TeaStat category={"Capacity"} data={"80 mL"}/>
                <TeaStat category={"Type"} data={"Gaiwan"}/>
                <TeaStat category={"Vendor"} data={"Floating Leaves"}/>
                
            </ListGroup>
            <EditDeleteButtons showButtons={buttons} label="Vessel" />
        </>
    )
}