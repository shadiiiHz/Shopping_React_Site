import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import { mobile } from "../../responsive";
const Container = styled.div`
  height: 800px;
  width: 86.5%;

  margin: 0px 100px 20px;
  align-self: center;
  ${mobile({
    width: "80%",
    height: "800px",
    zIndex: "-999999",
    
  })}
`;
const Img = styled.img`
  display: block;
  width: 100%;
  height: 500px;
 
  ${mobile({
 
  
  })}
`;
const ImageCarousel = ({ sliderImage }) => {
  return (
    <Container>
      <Carousel>
        {sliderImage &&
          sliderImage.map((img, index) => {
            return (
              <Carousel.Item key={img.id}>
                <Img
                 
                  src={`https://new-api.sevendisplays.com/storage/image/home/slider/${sliderImage[index].path}`}
                  alt="First slide"
                />
                {/* <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption> */}
              </Carousel.Item>
            );
          })}
      </Carousel>
    </Container>
  );
};

export default ImageCarousel;
