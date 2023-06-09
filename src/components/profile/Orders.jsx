import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
const Orders = ({ data }) => {
  return (
    <Card className="text-center" style={{ height: "400px", width: "1000px" }}>
      <Card.Header as="h5">Bestellungen</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Bestellnummer</th>
              <th>Bestelldatum</th>
              <th>Gesamtbetrag</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d,index) => {
            
              return(
                <tr>
                <td>{index + 1}</td>
                <td>{d.payment_intent}</td>
                <td>{d.created_at.split("T")[0].replaceAll("-",".").substr(2).split(".").reverse().join(".")}</td>
                <td>{d.amount_total} €</td>
                <td>Zeige Details</td>
              </tr>
              )
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Orders;
