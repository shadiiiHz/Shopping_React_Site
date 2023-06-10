import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/announcment/Announcement";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import MegaMenu from "../components/menu/MegaMenu";
import Navbar from "../components/navbar/Navbar";
import ScrollUp from "../components/scroll up/ScrollUp";
import { mobile } from "../responsive";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, FreeMode } from "swiper";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  ${mobile({
    width: "100vh",
    justifyContent: "center",
    alignItems: "center",
  })}
`;
const ProductCalculator = styled.div`
  flex: 3;

  padding-bottom: 30px;
  background-color: #fdfbfb;
  border: 1px solid #e9e9e9;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 0px 100px;
`;

const Product = styled.div`
  flex: 9;
  text-align: center;
  margin-top: 30px;
`;
const FlexRow = styled.div`
  justify-content: start;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const Thumbnail = styled.div`
  padding-left: 20px;
`;
const Img = styled.img``;
const ImgThumbnail = styled.img`
  margin: 5px;
  &:hover {
    border: 2px solid orange;
  }
`;

const SingleProduct = () => {
  const location = useLocation();
  // console.log()
  const productTitle = location.state;
  const path = location.pathname;
  const slug = location.pathname.split("/")[3];
  //   console.log(slug)
  /////////////slug//////////////
  const Slug = slug.charAt(0).toLowerCase() + slug.slice(1);
  let productSlug = Slug.split("-");
  for (let i = 0; i < productSlug.length; i++) {
    productSlug[i] = productSlug[i][0].toLowerCase() + productSlug[i].substr(1);
  }
  productSlug = productSlug.join("-");
  // console.log(productSlug)
  ////////////////////////////////////////

  const [showButton, setShowButton] = useState(false);
  const [parentSlug, setParentSlug] = useState("");
  // const [productTitle, setProductTitle] = useState("");
  const [breadcrumb, setBreadcrumb] = useState([
    {
      title: productTitle,
      slug: productSlug,
      level: "3",
    },
  ]);
  const [benefit_desc, setBenefit_desc] = useState("");
  const [feature_desc, setFeature_desc] = useState("");
  const [item_desc, setItem_desc] = useState("");
  const [technical_infos, setTechnical_infos] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [defaultImage, setDefaultImage] = useState([]);
  const [defaultOption_values, setDefaultOption_values] = useState([]);
  const [options, setOptions] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    const handelScrollButtonVisiblity = () => {
      if (window.pageYOffset > 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handelScrollButtonVisiblity);
    return () => {
      window.removeEventListener("scroll", handelScrollButtonVisiblity);
    };
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/detail-page/product/fetch/options/${productSlug}`
      )
      .then((response) => {
        // console.log(response.data.body.default_combination.images[0]);
        //get path
        setDefaultImage(response.data.body.default_combination?.images[0]);
        setDefaultOption_values(
          response.data.body.default_combination.option_values
        );
        setOptions(response.data.body.options);
        setDelivery(response.data.body.delivery);
        setServices(response.data.body.services);
      })

      .catch((error) => {
        // handle error
      });
  }, [productSlug]);
  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/detail-page/product/fetch/${productSlug}`
      )
      .then((response) => {
        // console.log(response.data.body.benefit_desc);
        // setProductTitle(response.data.body.title);
        setBenefit_desc(response.data.body.benefit_desc);
        setFeature_desc(response.data.body.feature_desc);
        setItem_desc(response.data.body.item_desc);
      })

      .catch((error) => {
        // handle error
      });
  }, [productSlug]);
  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/detail-page/product/fetch/infos/${productSlug}`
      )
      .then((response) => {
        console.log(response.data.body.portfolios);
        setTechnical_infos(response.data.body.technical_infos);
        setPortfolios(response.data.body.portfolios);
      })

      .catch((error) => {
        // handle error
      });
  }, [productSlug]);
  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/menus/fetch/menu/breadcrumb?product_slug=${productSlug}`
      )
      .then((response) => {
        // console.log(breadcrumb);
        setParentSlug(response.data?.body[1]?.slug);
        setBreadcrumb((result) => [
          response.data.body[0],
          response.data.body[1],
          ...result,
        ]);
      })
      .catch((error) => {
        // handle error
      });
  }, [productSlug]);

  const [wordData, setWordData] = useState(defaultImage);
  const [showDefaultImg, setShowDefaultImg] = useState(true);
  const handleClick = (index) => {
    const wordSlider = portfolios[index];
    setWordData(wordSlider);

    setShowDefaultImg(false);
  };
  const handleClickDefaultImg = () => {
    const wordSlider = defaultImage;
    setWordData(wordSlider);
    console.log(wordSlider.id);
    setShowDefaultImg(true);
  };

  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <MegaMenu />
        {/* <pre>{JSON.stringify(breadcrumb)}</pre> */}
        <Breadcrumb breadcrumb={breadcrumb} path={path} />
        <Wrapper>
          <Product>
            {showDefaultImg ? (
              <Img
                src={`https://new-api.sevendisplays.com/storage/image/product/combination/${defaultImage.path}`}
                height="300"
                width="500"
              />
            ) : (
              <Img
                // src={`https://new-api.sevendisplays.com/storage/image/product/combination/${defaultImage.path}`}
                src={`https://new-api.sevendisplays.com/storage/image/portfolio/${wordData.path}`}
                height="300"
                width="500"
              />
            )}

            <FlexRow>
              <Thumbnail>
                {" "}
                <ImgThumbnail
                  style={{ border: showDefaultImg ? "2px solid orange" : "" }}
                  src={`https://new-api.sevendisplays.com/storage/image/product/combination/${defaultImage.path}`}
                  onClick={() => handleClickDefaultImg()}
                  height="110"
                  width="150"
                />
              </Thumbnail>
            </FlexRow>
            {/* <FlexRow>
              <Thumbnail>
                {portfolios &&
                  portfolios.map((data, i) => {
                    let index = i + portfolios[0].id;
                    return (
                      <>
                        <ImgThumbnail
                          style={{
                            border:
                              wordData.id == index ? "2px solid orange" : "",
                          }}
                          src={`https://new-api.sevendisplays.com/storage/image/portfolio/${data.path}`}
                          onClick={() => handleClick(i)}
                          height="70"
                          width="100"
                        />
                      </>
                    );
                  })}
              </Thumbnail>
            </FlexRow> */}
            {portfolios.length !== 0 ? (
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
                style={{
                  width: "900px",
                  height: "110px",
                  borderBottom: "2px solid #ddd",
                  borderTop: "2px solid #ddd",
                }}
              >
                {portfolios &&
                  portfolios.map((data, i) => {
                    let index = i + portfolios[0].id;
                    return (
                      <>
                        <SwiperSlide
                          style={{
                            textAlign: "center",
                            fontSize: "18px",
                            background: "#f9f9f9",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                          }}
                        >
                          <ImgThumbnail
                            style={{
                              border:
                                wordData.id == index ? "2px solid orange" : "",
                              display: "block",
                              width: "100%",
                              height: "100%",

                              objectFit: "cover",
                            }}
                            src={`https://new-api.sevendisplays.com/storage/image/portfolio/${data.path}`}
                            onClick={() => handleClick(i)}
                            height="70"
                            width="100"
                          />
                        </SwiperSlide>
                      </>
                    );
                  })}
              </Swiper>
            ) : (
              ""
            )}
          </Product>

          {/* <ProductSlider  /> */}
          <ProductCalculator></ProductCalculator>
        </Wrapper>
        {showButton && <ScrollUp />}
      </Container>
    </>
  );
};

export default SingleProduct;
