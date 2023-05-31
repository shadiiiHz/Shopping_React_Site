import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/announcment/Announcement";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import MenuChild from "../components/megaMenuChild/MenuChild";

import MegaMenu from "../components/menu/MegaMenu";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidbar/Sidebar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 2500px;
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
  margin: 25px 0px 17px 25px;
  line-height: 1.5;
`;
const Hr = styled.hr`
  display: block;
  margin: 25px 0px 0px 25px;
  border-style: inset;
  border-width: 1.5px;
`;
const Section = styled.div`
  margin: 0px 0px 0px 25px;
`;
function MegaMenuChildren() {
  const location = useLocation();
  const slug = location.pathname.split("/")[1];

  const [text, setText] = useState("");
  const [children, setChildren] = useState([]);

  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/menus/fetch/${slug}`
      )
      .then((response) => {
        setText(response.data.body.description);
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
  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/menus/fetch/menu/breadcrumb?menu_slug=${slug}`
      )
      .then((response) => {
        console.log(response.data.body);
        setBreadcrumb(response.data.body);
      })
      .catch((error) => {
        // handle error
      });
  }, []);
  var element = document.createElement("div");
  function decodeHTMLEntities(str) {
    if (str && typeof str === "string") {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }

    return str;
  }

  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <MegaMenu />
        <Breadcrumb breadcrumb={breadcrumb} />
        <Wrapper>
          <Sidebar />
          <DesChildren>
            <Section
              dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(text) }}
            />
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
