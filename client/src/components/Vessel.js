import { ListGroup } from "react-bootstrap"
import TeaStat from './TeaStat.js'
import EditDeleteButtons from "./EditDeleteButtons.js"

export default function Vessel(props){
    return (
        <>
            <ListGroup horizontal={"lg"}>
                <TeaStat category={"Name"} data={props.name}/>
                <TeaStat category={"Capacity"} data={props.capacity + "mL"}/>
                <TeaStat category={"Type"} data={props.type}/>
                <TeaStat category={"Vendor"} data={props.vendor}/>
                <TeaStat category={"Favorite"} data={props.favorite? "Yes" : "No"} />
                <TeaStat category={"Excluded"} data={props.exclude? "Yes" : "No"}/>
            </ListGroup>
            <EditDeleteButtons
                showButtons={props.buttons}
                label="Vessel"
                id={props.id}
                deleteFunction={props.deleteFunction}
                editFunction={props.editFunction}
                type={"vessel"}
            />
        </>
    )
}