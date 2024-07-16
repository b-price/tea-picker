import { Button } from "react-bootstrap"
import DeleteConfirm from "./DeleteConfirm.js"
import { useState } from "react"

export default function EditDeleteButtons({showButtons, label, id, deleteFunction}){
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    
    function openDeleteConfirmModal() {
        setShowDeleteConfirm(true)
    }
    if (showButtons){
        
        return (
            <>
                <Button variant="outline-secondary" size="sm" className="m-2 me-auto">
                    Edit {label}
                </Button>
                <Button variant="outline-danger" size="sm" className="m-2 me-auto" onClick={() => openDeleteConfirmModal()}>
                    Delete {() => {openDeleteConfirmModal()}}
                </Button>
                <DeleteConfirm
                    show={showDeleteConfirm}
                    handleClose={() => setShowDeleteConfirm(false)}
                    id={id}
                    deleteFunction={deleteFunction}
                />
            </>
        )
    }

}