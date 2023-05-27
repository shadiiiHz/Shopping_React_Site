import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  max-width: 280px;
  height: 350px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #fff;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  &:hover {
    border-left: 3px solid #fc6c00;
    box-shadow: 0 0 10px #ccc;
  }
`;
const Title = styled.h1`
  color: black;
  margin: 10px 0px;
  font-size: 18px;
  font-weight: bold;
`;
const Image = styled.img`
  height: 70%;
`;
const Btn = styled.button`
  background-color: #333;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 26px;
  text-transform: uppercase;
  margin: 10px 0px;
`;
function MenuChild({ slug, child }) {
  // console.log(slug);

  const Slug = slug.charAt(0).toUpperCase() + slug.slice(1);
  // console.log(child.slug);
  let ChildSlug = child.slug.split("-");
  for (let i = 0; i < ChildSlug.length; i++) {
    ChildSlug[i] = ChildSlug[i][0].toUpperCase() + ChildSlug[i].substr(1);
  }
  ChildSlug = ChildSlug.join("-");

  return (
    <>
      <Container>
        <Title>{child.title}</Title>
        <Image
          src={`https://new-api.sevendisplays.com/storage/image/menu/${child.menu_info.thumbnail_image}`}
        ></Image>

        <Link to={`${ChildSlug}`} style={{ textDecoration: "none" }}>
          <Btn>
            Produktübersicht
            <ArrowRightIcon />
          </Btn>
        </Link>
      </Container>
    </>
  );
}

export default MenuChild;
