import { ListGroup } from "react-bootstrap"
import TeaStat from './TeaStat.js'
import EditDeleteButtons from "./EditDeleteButtons.js"

export default function Session(props){
    return (
        <>
            <ListGroup horizontal={"lg"}>
                <TeaStat category={"Date"} data={props.date}/>
                <TeaStat category={"Tea"} data={props.teaName}/>
                <TeaStat category={"Type"} data={props.teaType}/>
                <TeaStat category={"Vendor"} data={props.teaVendor}/>
                <TeaStat category={"Vessel"} data={props.vesselName}/>
                <TeaStat category={"Rating"} data={props.rating + "/10"}/>
                <TeaStat category={"Amount"} data={props.quantity + "g"}/>
                
            </ListGroup>
            <EditDeleteButtons
                showButtons={props.buttons}
                label="Session"
                deleteFunction={props.deleteFunction}
                editFunction={props.editFunction}
                id={props.id}
                type={"session"}
            />
        </>
    )
}