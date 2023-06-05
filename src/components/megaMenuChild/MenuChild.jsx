import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { keyframes } from "styled-components";
import { mobile } from "../../responsive";
const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  max-width: 280px;

  border: 1px solid rgba(0, 0, 0, 0.125);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #fff;
  flex-direction: column;

  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  &:hover {
    border-left: 3px solid #fc6c00;
    box-shadow: 0 0 10px #ccc;
  }
  ${mobile({
    minWidth: "470px",
    maxWidth: "470px",

    justifyContent: "center",
    marginLeft: " 0px",
  })}
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
const ImgNotFound = styled.div`
  background-color: #fff;
  width: 230px;
`;
const PlaceHolderShimmer = keyframes`
0% {
  background-position: -800px 0;
}
100% {
  background-position: 800px 0;
}
`;
const AnimatedBackground = styled.div`
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${PlaceHolderShimmer};
  animation-timing-function: linear;
  background-color: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #bbbbbb 18%, #eeeeee 33%);
  background-size: 700px 104px;
  height: 243px;
  width: 230px;
`;
const BackgroundMasker = styled.div`
  background-color: #fff;
  position: absolute;
`;
function MenuChild({ slug, child }) {
  // console.log(slug);
  const [Error, setError] = useState(false);
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

        {Error ? (
          <ImgNotFound>
            <AnimatedBackground>
              <BackgroundMasker></BackgroundMasker>
            </AnimatedBackground>
          </ImgNotFound>
        ) : (
          <Image
            src={`https://new-api.sevendisplays.com/storage/image/menu/${child.menu_info.thumbnail_image}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              setError(true);
            }}
          ></Image>
        )}

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
