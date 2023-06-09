import React from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
const CardImg = styled.img`
  margin: 50px 0px 30px;
  width: 20%;
`;
const Profiles = () => {
  return (
    <Card className="text-center" style={{ height: "400px" }}>
      <Card.Header as="h5">Übersicht</Card.Header>
      <Card.Body>
        <CardImg
          src="https://new.sevendisplays.com/_nuxt/img/profile-home.80ecd12.svg"
          alt=""
        />
        <Card.Text>Willkommen in Ihrem Kundenkono</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Profiles;
