import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/announcment/Announcement";
import MenuChild from "../components/megaMenuChild/MenuChild";

import MegaMenu from "../components/menu/MegaMenu";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidbar/Sidebar";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 1000px;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 0px 100px;
`;
const Children = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;

  justify-content: start;
  background-color: white;
`;
const DesChildren = styled.div`
  flex: 9;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: white;
`;
const Title = styled.h5`
  font-weight: 650;
  font-size: 20px;
  margin: 25px 0px 0px 25px;
`;
const Des = styled.h5`
  font-weight: 400;
  font-size: 17px;
  margin: 25px 0px 0px 25px;
  line-height: 1.5;
`;
const Hr = styled.hr`
  display: block;
  margin: 25px 0px 0px 25px;
  border-style: inset;
  border-width: 1.5px;
`;
function MegaMenuChildren() {
  const location = useLocation();
  const slug = location.pathname.split("/")[1];
  const [description, setDescription] = useState("");
  const [children, setChildren] = useState([]);
  const [title, setTitle] = useState("");
//   const [sentence, setSentence] = useState([]);
 
  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/menus/fetch/${slug}`
      )
      .then((response) => {
        // let letter = [];
        // letter = response.data.body.description.split(";");
        // console.log(letter);
        // for (let i = 0; i < letter.length; i++) {
        //     if (letter[i].includes(slug)) {
        //       console.log("i", letter[i]);
              
        //     }
        //   }
        setDescription(response.data.body.description.split(";")[8]);
        setTitle(response.data.body.description.split(";")[2]);
      })
      .catch((error) => {
        // handle error
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/menus/fetch/children/${slug}`
      )
      .then((response) => {
        // console.log(response.data.body);
        setChildren(response.data.body);
      })
      .catch((error) => {
        // handle error
      });
  }, []);
  
  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <MegaMenu />
        <Wrapper>
          <Sidebar />
          <DesChildren>
            <Title>{title}</Title>
            <Hr />
            <Des>{description}</Des>
            <Children>
              {children.map((child) => {
                return <MenuChild slug={slug} child={child} key={child.id} />;
              })}
            </Children>
          </DesChildren>
        </Wrapper>
      </Container>
    </>
  );
}

export default MegaMenuChildren;
