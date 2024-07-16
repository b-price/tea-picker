import { Button } from "react-bootstrap"
import DeleteConfirm from "./DeleteConfirm.js"
import { useState } from "react"
import Edit from "./Edit.js";
import {useTea} from "../contexts/TeaContext.js";

export default function EditDeleteButtons({showButtons, label, id, deleteFunction, editFunction, type}){
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showEdit,setShowEdit] = useState(false)
    const { getTea } = useTea()
    let current = {}
    function openDeleteConfirmModal() {
        setShowDeleteConfirm(true)
    }
    function openEdit(){
        setShowEdit(true)
    }
    switch(type){
        case "tea":
            current = getTea(id)
            break
        case "vessel":
            current = getTea(id)
            break
        case "session":
            current = getTea(id)
            break
        default:
            console.error("No type specified")
    }

    if (showButtons){
        
        return (
            <>
                <Button variant="outline-secondary" size="sm" className="m-2 me-auto" onClick={() => openEdit()}>
                    Edit
                </Button>
                <Button variant="outline-danger" size="sm" className="m-2 me-auto" onClick={() => openDeleteConfirmModal()}>
                    Delete
                </Button>
                <DeleteConfirm
                    show={showDeleteConfirm}
                    handleClose={() => setShowDeleteConfirm(false)}
                    id={id}
                    deleteFunction={deleteFunction}
                />
                <Edit
                    show={showEdit}
                    handleClose={() => setShowEdit(false)}
                    edit={editFunction}
                    type={type}
                    current={current}
                />
            </>
        )
    }

}