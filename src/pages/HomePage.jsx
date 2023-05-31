import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/announcment/Announcement";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ImageCarousel from "../components/carousel/ImageCarousel";
import Footer from "../components/footer/Footer";
import MegaMenu from "../components/menu/MegaMenu";
import Navbar from "../components/navbar/Navbar";
import Product from "../components/product/Product";
import Sidebar from "../components/sidbar/Sidebar";
import { getMegaMenu } from "../redux/apiCalls";
import { mobile } from "../responsive";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 2750px;
  width: "100vh";
  
  ${mobile({
    height: "5200px",
    width: "100vh",
    justifyContent: "center",
    alignItems: "center",
   
  })}
`;
const Section = styled.div`
  margin: 20px 100px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  ${mobile({ margin: " 0px 300px 27px"})}
`;
const Home = styled.div`
  display: flex;
  margin: 0px 100px;
  background-color: white;
  height: 1600px;
  ${mobile({
    height: "5000px",
  })}
`;
const HomeSecetion = styled.div`
  flex: 9;
  display: flex;
  flex-direction: column;
  justify-content: start;
  ${mobile({ })}
`;
const Products = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  background-color: white;
  display: ${({ open }) => open ? 'none' : ''};
  ${mobile({
    alignItems: "center",
    
    margin: " 0 auto"
  })}
`;
function HomePage() {
  
  const [product, setProducts] = useState([]);
  const [description, setDescription] = useState([]);
  const [sliderImage, setSliderImage] = useState([]);
  const openClose = useSelector((state) => state.menuToggle.menuOpen);

  useEffect(() => {
    axios
      .get(`https://new-api.sevendisplays.com/api/v1/user/site/home/fetch`)
      .then((response) => {
        setSliderImage(response.data.body.slider_image);
        setDescription(response.data.body.home_info.description);
        setProducts(response.data.body.sections[0].product_t);
        // console.log(response.data.body);
      })
      .catch((error) => {
        // handle error
      });
  }, [openClose]);
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
            <Products open={openClose}>
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
