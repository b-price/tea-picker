import Table from 'react-bootstrap/Table';
import { Button, ListGroup, Card, ListGroupItem } from 'react-bootstrap';

export default function LastSession() {
  return (
    <>
      <Card >
        <Card.Body>
          <Card.Title>Last Session</Card.Title>
          <ListGroup horizontal={"lg"}>
            <TeaStat category={"Date"} data={"1/1/12"}/>
            <TeaStat category={"Tea"} data={"Honey Dan Cong"}/>
            <TeaStat category={"Type"} data={"Oolong"}/>
            <TeaStat category={"Vendor"} data={"Floating Leaves"}/>
            <TeaStat category={"Vessel"} data={"Small Gaiwan"}/>
            <TeaStat category={"Rating"} data={"9.5"}/>
          </ListGroup>
        </Card.Body>
      </Card>

      
    </>
  );
}

function TeaStat({category, data}){
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{ category }:</div>
        {data}
      </div>
    </ListGroup.Item>
  )
}

