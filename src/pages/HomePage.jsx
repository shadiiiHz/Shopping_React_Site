
import React from "react";
import styled from "styled-components";
import Announcement from "../components/announcment/Announcement";
import MegaMenu from "../components/menu/MegaMenu";
import Navbar from "../components/navbar/Navbar";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 2000px;
`;

function HomePage() {
  return (
    <>
      <Container>
        <Announcement />
        <Navbar />

        <MegaMenu />
      </Container>
    </>
  );
}

export default HomePage;
