import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
const Container = styled.div`
  height: 800px;
  width: 86.5%;
 
  margin: 0px 100px 20px;
 align-self: center;
`;
const ImageCarousel = ({ sliderImage }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Container>
      <Carousel>
        {sliderImage &&
          sliderImage.map((img, index) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
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
