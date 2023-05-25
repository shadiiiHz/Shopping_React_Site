import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/announcment/Announcement";
import MegaMenu from "../components/menu/MegaMenu";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidbar/Sidebar";
import { getMegaMenu } from "../redux/apiCalls";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 2000px;
`;
const Home = styled.div`
  display: flex;
  margin: 0px 100px;
  background-color: pink;
  height: 2000px;
`;
function HomePage() {
  
  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <MegaMenu/>
        <Home>
          <Sidebar />
        </Home>
      </Container>
    </>
  );
}

export default HomePage;
