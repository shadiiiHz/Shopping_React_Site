import React from "react";
import styled from "styled-components";

import { keyframes } from "styled-components";
const ImgNotFound = styled.div`
  padding: 10px;
  background-color: #fff;
  width: 700px;
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
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${PlaceHolderShimmer};
  animation-timing-function: linear;
  background-color: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #bbbbbb 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 200px;
  width: 200px;
  position: relative;
`;
const BackgroundMasker = styled.div`
  background-color: #fff;
  position: absolute;
`;

function ImgNotFound() {
  return (
    <ImgNotFound>
      <AnimatedBackground>
        <BackgroundMasker></BackgroundMasker>
      </AnimatedBackground>
    </ImgNotFound>
  );
}

export default ImgNotFound;
