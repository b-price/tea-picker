import { ListGroup, Button, Modal } from 'react-bootstrap'
import TeaStat from './TeaStat'
import { useState } from 'react'
import DeleteConfirm from './DeleteConfirm'

export default function Tea({buttons = true}){
    
    return (
        <>
            <ListGroup horizontal={"xl"}>
                <TeaStat category={"Name"} data={"Honey Dan Cong"} />
                <TeaStat category={"Type"} data={"Oolong"} />
                <TeaStat category={"Vendor"} data={"Floating Leaves"} />
                <TeaStat category={"Price/g"} data={"0.50"} />
                <TeaStat category={"Amount"} data={"62"} />
                <TeaStat category={"Rating"} data={"9.5"} />
                <TeaStat category={"Year"} data={"2022"} />
                <TeaStat category={"Sessions"} data={"5"} />
                <TeaStat category={"Tea:Water"} data={"4.5g/mL"} />
                
            </ListGroup>
            
            <Buttons showButtons={buttons} />
        </>
    )
}

function Buttons({showButtons}){
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    
    function openDeleteConfirmModal() {
        setShowDeleteConfirm(true)
    }
    if (showButtons){
        
        return (
            <>
                <Button variant="outline-secondary" size="sm" className="m-2 me-auto">
                    Edit Tea
                </Button>
                <Button variant="outline-danger" size="sm" className="m-2 me-auto" onClick={() => openDeleteConfirmModal()}>
                    Delete Tea
                </Button>
                <DeleteConfirm show={showDeleteConfirm} handleClose={() => setShowDeleteConfirm(false)} />
            </>
        )
    }

}
