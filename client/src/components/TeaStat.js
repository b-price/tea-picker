import { ListGroup } from "react-bootstrap"

export default function TeaStat({category, data}){
    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{ category }:</div>
          {data}
        </div>
      </ListGroup.Item>
    )
  }