import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/announcment/Announcement";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ImageCarousel from "../components/carousel/ImageCarousel";
import MegaMenu from "../components/menu/MegaMenu";
import Navbar from "../components/navbar/Navbar";
import Product from "../components/product/Product";
import Sidebar from "../components/sidbar/Sidebar";
import { getMegaMenu } from "../redux/apiCalls";
const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 2000px;
`;
const Section = styled.div`
  margin: 20px 100px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Home = styled.div`
  display: flex;
  margin: 0px 100px;
  background-color: white;
  height: 1600px;
`;
const HomeSecetion = styled.div`
  flex: 9;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const Products = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  background-color: white;
`;
function HomePage() {
  const [homeData, setHomeData] = useState([]);
  const [product, setProducts] = useState([]);
  const [description, setDescription] = useState([]);
  const [sliderImage, setSliderImage] = useState([]);

  useEffect(() => {
    axios
      .get(`https://new-api.sevendisplays.com/api/v1/user/site/home/fetch`)
      .then((response) => {
        setSliderImage(response.data.body.slider_image);
        setDescription(response.data.body.home_info.description);
        setProducts(response.data.body.sections[0].product_t);
        console.log(response.data.body.slider_image);
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
        <ImageCarousel sliderImage={sliderImage} />

        <Home>
          <Sidebar />
          <HomeSecetion>
            <Products>
              {product.map((p, index) => {
                return <Product product={product} index={index} key={p.id} />;
              })}
            </Products>
          </HomeSecetion>
        </Home>
        <Section dangerouslySetInnerHTML={{ __html: description }} />
      </Container>
    </>
  );
}

export default HomePage;
