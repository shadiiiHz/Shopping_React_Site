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
import Tabs from "../components/tablist/Tabs";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
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
const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductCalculator = styled.div`
  flex: 3;
  padding-bottom: 30px;
  background-color: #333;
  border: 1px solid #e9e9e9;
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-items: start;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 0px 100px;
`;
const Bottom = styled.div`
  display: flex;
  margin: 40px 100px;
  background-color: pink;
`;
const Right = styled.div`
  flex: 3;
  padding-bottom: 30px;
  background-color: #fdfbfb;
  border: 1px solid #e9e9e9;
  display: flex;
  flex-direction: column;
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
const Title = styled.h1`
  color: white;
  margin: 5px 0px;
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid grey;
`;
const Options = styled.div`
  color: white;

  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid grey;
`;
const SelectContainer = styled.div`
  margin: 10px 0px;
`;
const SingleProduct = () => {
  const location = useLocation();

  const productTitle = location.state;
  const path = location.pathname;
  const slug = location.pathname.split("/")[3];

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
  const [breadcrumb, setBreadcrumb] = useState([
    {
      title: productTitle,
      slug: productSlug,
      level: "3",
    },
  ]);
  const [price, setPrice] = useState("");
  const [benefit_desc, setBenefit_desc] = useState("");
  const [feature_desc, setFeature_desc] = useState("");
  const [item_desc, setItem_desc] = useState("");
  const [technical_infos, setTechnical_infos] = useState([]);
  const [shipping_info, setShipping_info] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [defaultImage, setDefaultImage] = useState([]);
  const [defaultOption_values, setDefaultOption_values] = useState([]);
  const [options, setOptions] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [services, setServices] = useState([]);
  const [wordData, setWordData] = useState();
  const [showDefaultImg, setShowDefaultImg] = useState(true);
  const [blur, setBlur] = useState(false);
  const [select, setSelected] = useState(new Map());
  const [selectArr, setSelectedArr] = useState([]);
  // let result = []
  /////////////////decodeHTMLEntities////////////////////////////
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
  function getValuesFirstApproach(map) {
    const result = [];
    map.forEach((value) => {
      if (value != 0) {
        result.push(value);
      }
    });

    return result.sort(function (a, b) {
      return a - b;
    });
  }
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
        console.log(response.data.body.default_combination.option_values);
        console.log(Object.values(response.data.body.options));
        //get path
        setDefaultImage(response.data.body.default_combination?.images);
        setWordData(response.data.body.default_combination?.images[0]);
        setDefaultOption_values(
          response.data.body.default_combination.option_values
        );
        response.data.body.default_combination.option_values.map((opt) => {
          setSelected(select.set(opt.option_id, opt.id));
        });
        setSelectedArr(getValuesFirstApproach(select));

        setOptions(Object.values(response.data.body.options));
        setDelivery(response.data.body.delivery);
        setServices(response.data.body.services);
        setPrice(response.data.body.product_info.price);
      })

      .catch((error) => {
        // handle error
      });
  }, [productSlug]);

  useEffect(() => {
    // setSelectedArr(getValuesFirstApproach(select))
    console.log("select", select);

    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/detail-page/product/fetch/combination-info/${productSlug}?combination=${selectArr}`
      )
      .then((response) => {
        console.log(response.data.body);
        if (response.data.body != null) {
          console.log("in")
          setDefaultImage(response?.data?.body?.images);
          setWordData(response?.data?.body?.images[0]);
          setBlur(false);
        } else {
          console.log("on")
          setBlur(true);
        }
      })

      .catch((error) => {
        // handle error
      });
  }, [productSlug, select, selectArr]);
  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/detail-page/product/fetch/${productSlug}`
      )
      .then((response) => {
        // console.log(response.data.body.feature_desc);
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
        // console.log(response.data.body.technical_infos);
        setTechnical_infos(response.data.body.technical_infos);
        setPortfolios(response.data.body.portfolios);
        setShipping_info(response.data.body.shipping_info);
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

  const handleClick = (index) => {
    const wordSlider = portfolios[index];
    setWordData(wordSlider);
    setShowDefaultImg(false);
  };
  const handleClickDefaultImg = (i) => {
    const wordSlider = defaultImage[i];
    setWordData(wordSlider);

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

        <ContainerInfo>
          <Wrapper>
            <Product>
              {showDefaultImg ? (
                <Img
                  src={`https://new-api.sevendisplays.com/storage/image/product/combination/${wordData?.path}`}
                  height="500"
                  width="700"
                  style={{filter: blur ? "blur(2px)" : "none"}}
                />
              ) : (
                <Img
                  src={`https://new-api.sevendisplays.com/storage/image/portfolio/${wordData?.path}`}
                  height="500"
                  width="700"
                  style={{filter: blur ? "blur(2px)" : "none"}}
                />
              )}

              <FlexRow>
                <Thumbnail>
                  {defaultImage &&
                    defaultImage.map((img, i) => {
                      let index = defaultImage[i].id;
                      return (
                        <ImgThumbnail
                          style={{
                            border:
                              wordData?.id == index ? "2px solid orange" : "",
                          }}
                          src={`https://new-api.sevendisplays.com/storage/image/product/combination/${img?.path}`}
                          onClick={() => handleClickDefaultImg(i)}
                          height="auto"
                          width="106"
                          key={index}
                        />
                      );
                    })}
                </Thumbnail>
              </FlexRow>

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
                      let index = portfolios[i]?.id;
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
                            key={index}
                          >
                            <ImgThumbnail
                              style={{
                                border:
                                  wordData?.id == index
                                    ? "2px solid orange"
                                    : "",
                                display: "block",
                                width: "100%",
                                height: "100%",

                                objectFit: "cover",
                              }}
                              src={`https://new-api.sevendisplays.com/storage/image/portfolio/${data?.path}`}
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

            <ProductCalculator>
              <Title>{productTitle}</Title>

              {defaultOption_values.length != 0 && options && (
                <Options>
                  {options?.map((option) => {
                    if (option.has_no_select === "0") {
                      return (
                        <SelectContainer key={option.option_id}>
                          <label>{option?.title}</label>
                          <select
                            style={{ padding: "5px", width: "100%" }}
                            disabled={false}
                            // value={select}
                            onChange={(e) => {
                              setSelected(
                                select.set(
                                  option.option_id,
                                  parseInt(e.currentTarget.value)
                                ),
                                setSelectedArr(getValuesFirstApproach(select))
                              );
                              console.log(select);
                            }}
                          >
                            {option?.option_values?.map((item, i) => {
                              {
                                var selected = false;
                                for (
                                  var i = 0;
                                  i < defaultOption_values.length;
                                  i++
                                ) {
                                  const optValuId =
                                    defaultOption_values[i]?.pivot
                                      ?.option_value_id;
                                  if (optValuId === item.option_value_id) {
                                    selected = true;

                                    return (
                                      <option
                                        selected={selected}
                                        key={item.option_value_id}
                                        value={item.option_value_id}
                                      >
                                        {item.price > 0
                                          ? `${item.title} (+${item.price} €)`
                                          : `${item.title}`}
                                      </option>
                                    );
                                  }
                                  if (selected === false) {
                                    return (
                                      <option
                                        key={item.option_value_id}
                                        value={item.option_value_id}
                                      >
                                        {item.price > 0
                                          ? `${item.title} (+${item.price} €)`
                                          : `${item.title}`}
                                      </option>
                                    );
                                  }
                                }
                              }
                            })}
                          </select>
                        </SelectContainer>
                      );
                    } else {
                      return (
                        <SelectContainer key={option.option_id}>
                          <label>{option?.title}</label>
                          <select
                            style={{ padding: "5px", width: "100%" }}
                            disabled={false}
                            // value={select}
                            onChange={(e) => {
                              setSelected(
                                select.set(
                                  option.option_id,
                                  parseInt(e.currentTarget.value)
                                ),
                                setSelectedArr(getValuesFirstApproach(select))
                              );
                              console.log(select);
                            }}
                          >
                            <option value={0}>- Nichts ausgewählt -</option>
                            {option?.option_values?.map((item, i) => {
                              {
                                var selected = false;
                                for (
                                  var i = 0;
                                  i < defaultOption_values.length;
                                  i++
                                ) {
                                  const optValuId =
                                    defaultOption_values[i]?.pivot
                                      ?.option_value_id;
                                  if (optValuId === item.option_value_id) {
                                    selected = true;
                                    return (
                                      <option
                                        selected={selected}
                                        key={item.option_value_id}
                                        value={item.option_value_id}
                                      >
                                        {/* {item.title} (+{item.price}€)  */}
                                        {item.price > 0
                                          ? `${item.title} (+${item.price} €)`
                                          : `${item.title}`}
                                      </option>
                                    );
                                  }
                                  if (selected === false) {
                                    return (
                                      <option
                                        key={item.option_value_id}
                                        value={item.option_value_id}
                                      >
                                        {item.price > 0
                                          ? `${item.title} (+${item.price} €)`
                                          : `${item.title}`}
                                      </option>
                                    );
                                  }
                                }
                              }
                            })}
                          </select>
                        </SelectContainer>
                      );
                    }
                  })}
                </Options>
              )}

              {defaultOption_values.length == 0 && options && (
                <Options>
                  {options?.map((option) => {
                    if (option.has_no_select === "0") {
                      return (
                        <SelectContainer key={option.option_id}>
                          <label>{option?.title}</label>
                          <select
                            style={{ padding: "5px", width: "100%" }}
                            disabled={false}
                            // value={select}
                            onChange={(e) => {
                              setSelected(
                                select.set(
                                  option.option_id,
                                  parseInt(e.currentTarget.value)
                                ),
                                setSelectedArr(getValuesFirstApproach(select))
                              );
                              console.log(select);
                            }}
                          >
                            {option?.option_values?.map((item) => (
                              <option
                                key={item.option_value_id}
                                value={item.option_value_id}
                              >
                                {item.price > 0
                                  ? `${item.title} (+${item.price} €)`
                                  : `${item.title}`}
                              </option>
                            ))}
                          </select>
                        </SelectContainer>
                      );
                    } else {
                      return (
                        <SelectContainer key={option.option_id}>
                          <label>{option?.title}</label>
                          <select
                            style={{ padding: "5px", width: "100%" }}
                            disabled={false}
                            // value={select}
                            onChange={(e) => {
                              setSelected(
                                select.set(
                                  option.option_id,
                                  parseInt(e.currentTarget.value)
                                ),
                                setSelectedArr(getValuesFirstApproach(select))
                              );
                              console.log(select);
                            }}
                          >
                            <option value={0}>- Nichts ausgewählt -</option>
                            {option?.option_values?.map((item) => (
                              <option
                                key={item.option_value_id}
                                value={item.option_value_id}
                              >
                                {item.price > 0
                                  ? `${item.title} (+${item.price} €)`
                                  : `${item.title}`}
                              </option>
                            ))}
                          </select>
                        </SelectContainer>
                      );
                    }
                  })}
                </Options>
              )}
            </ProductCalculator>
          </Wrapper>
          <Bottom>
            <Tabs
              benefit_desc={benefit_desc}
              item_desc={item_desc}
              technical_infos={technical_infos}
              shipping_info={shipping_info}
            />
            <Right></Right>
          </Bottom>
        </ContainerInfo>

        {showButton && <ScrollUp />}
      </Container>
    </>
  );
};

export default SingleProduct;
