import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
import Modal from "@mui/material/Modal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
  ${mobile({
    display: "none",
  })}
`;
const ProductCalculatorModal = styled.div`
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
  ${mobile({
    width: "100vh",
    justifyContent: "center",
    alignItems: "center",

    margin: "0px",
  })}
`;
const Bottom = styled.div`
  display: flex;
  margin: 40px 100px;
`;
const Right = styled.div`
  flex: 3;
  padding-bottom: 30px;
  background-color: #fdfbfb;
  border: 1px solid #e9e9e9;
  display: flex;
  flex-direction: column;
  ${mobile({
    display: "none",
  })}
`;
const Product = styled.div`
  flex: 9;
  text-align: center;
  margin-top: 30px;

  ${mobile({
    margin: "0px 50px",
    width: "100px",
  })}
`;
const FlexRow = styled.div`
  justify-content: start;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const SwiperContainer = styled.div`
  width: 900px;
  height: 120px;
  border-bottom: 2px solid #ddd;
  border-top: 2px solid #ddd;
  display: ${(props) => (props.openMenu ? "none" : "")};
  ${mobile({
    width: "550px",
  })}
`;
const Thumbnail = styled.div`
  padding-left: 20px;
`;
const Img = styled.img`
  height: 500px;
  width: 700px;
  ${mobile({
    width: "600px",
  })}
`;

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
const ModalTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: white;
`;
const Options = styled.div`
  color: white;

  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid grey;
`;
const Delivery = styled.div`
  color: white;
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid grey;
`;
const Services = styled.div`
  color: white;
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid grey;
`;
const BottomSection = styled.div`
  color: white;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const TotalPrice = styled.div`
  color: white;

  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  align-items: center;
  background-image: linear-gradient(90deg, #e75b50, #e87c28);
  border-bottom: 2px solid #fff;
  border-top: 2px solid #fff;
  color: #fff;
  display: flex;
  font-size: 1.25rem;
  font-weight: 500;
  justify-content: center;
  margin: 0.5rem 0 0.5rem -15px;
  text-transform: uppercase;
  width: calc(100% + 30px);
  height: 50px;
  &:hover {
    color: black;
  }
`;
const ModalButton = styled.button`
  align-items: center;
  opacity: 0;
  border-bottom: 2px solid #fff;
  border-top: 2px solid #fff;
  color: #fff;
  display: flex;
  font-size: 1.25rem;
  font-weight: 500;
  justify-content: center;

  background-color: #333333;
  width: calc(100% + 30px);
  cursor: pointer;
  height: 50px;
  &:hover {
    color: black;
  }
  ${mobile({
    opacity: 1,
  })}
`;
const Information = styled.div`
  color: white;

  padding-top: 10px;
  width: 100%;
  border-bottom: 1px solid grey;
  display: flex;
  flex-direction: column;
`;
const InformationTop = styled.div`
  flex: 1;
  display: flex;
`;
const InformationTopRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  flex: 60%;
`;
const InformationTopLeft = styled.div`
  flex: 40%;
`;
const InformationBottom = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;
const Input = styled.input`
  color: gray;
  border: none;
  padding: 3px;
  width: 30%;
  &:focus {
    outline: none;
  }
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
  const [modalTitle, setModalTitle] = useState("");
  const [breadcrumb, setBreadcrumb] = useState([
    {
      title: productTitle,
      slug: productSlug,
      level: "3",
    },
  ]);
  const [price, setPrice] = useState(0);
  const [productCount, setProductCount] = useState(1);
  const [optionPrice, setOptionPrice] = useState(0);
  const [division, setDivision] = useState(0);
  const [optionPriceDiscount, setOptionPriceDiscount] = useState(0);
  const [optDel, setOptDel] = useState(0);
  const [priceMap, setPriceMap] = useState(new Map());
  const [total, setTotal] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [servicePrice, setServicePrice] = useState(0);

  const [duration, setDuration] = useState(new Map());
  const [totalDuration, setTotalDuration] = useState("");

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
  const [discounts, setDiscounts] = useState([]);
  const [discountsPercent, setDiscountsPercent] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);
  var days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  const [dayName, setDayName] = useState("");
  ////////////////////Modal///////////////////////
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  ///////////////////date///////////////
  const dateCalculation = (duration) => {
    const currentDate = new Date();
    // const currentDate2 = new Date().toLocaleString("en-US", {timeZone: "Europe/Berlin"});

    var result = currentDate.setDate(currentDate.getDate() + Number(duration));
    result = new Date(result);

    const date = `${
      result.getDate() < 10 ? `0${result.getDate()}` : `${result.getDate()}`
    }.${
      result.getMonth() < 10
        ? `0${result.getMonth() + 1}`
        : `${result.getMonth() + 1}`
    }.${result.getFullYear().toString().substr(-2)}`;
    console.log("currentDate", date);
    // var dayName = days[result.getDay()];
    setDayName(days[result.getDay()]);
    // console.log("date", dayName);
    return date;
  };

  ////////////////////////////////////////
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
  function sum(map) {
    let sum = 0;
    map.forEach((v) => {
      sum += v;
    });
    return sum;
  }
  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
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
        // console.log("delivery", response.data.body.delivery);

        // console.log("services", response.data.body.services);
        // console.log("discount", response.data.body.discounts);
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
        if (response.data.body.delivery[0]) {
          setDuration(
            duration.set(
              "delivery",
              parseInt(response.data.body.delivery[0]?.duration)
            )
          );
        }
        if (response.data.body.services[0]) {
          setDuration(
            duration.set(
              "service",
              parseInt(
                response.data.body.services[0]?.service_value[0]?.duration
              )
            )
          );
        }

        // console.log("service", serviceDuration);
        setDiscounts(response.data.body.discounts);
      })

      .catch((error) => {
        // handle error
      });
  }, [productSlug]);

  useEffect(() => {
    setTotalDuration(dateCalculation(sum(duration)));
    console.log("duration", duration);
    console.log("totalDuration", sum(duration));
  }, [delivery, services, duration, totalDuration]);

  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/detail-page/product/fetch/${productSlug}`
      )
      .then((response) => {
        // console.log(response.data.body.title);
        setModalTitle(response.data.body.title);
        // setProductTitle(response.data.body.title);
        // console.log(parseFloat(response.data.body.product_info.price))
        setPrice(parseFloat(response.data.body.product_info.price));
        setOptionPrice(parseFloat(response.data.body.product_info.price));
        setBenefit_desc(response.data.body.benefit_desc);
        setFeature_desc(response.data.body.feature_desc);
        setItem_desc(response.data.body.item_desc);
      })

      .catch((error) => {
        // handle error
      });
  }, [productSlug]);
  useEffect(() => {
    // console.log("selectArr", selectArr);

    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/detail-page/product/fetch/combination-info/${productSlug}?combination=${selectArr}`
      )
      .then((response) => {
        console.log(response.data.body);

        if (response.data.body != null) {
          setBlur(false);
          setDefaultImage(response?.data?.body?.images);
          setWordData(response?.data?.body?.images[0]);

          setOptionPrice(parseFloat(response.data.body.price) + price);
          setPriceMap(
            priceMap.set("option", parseFloat(response.data.body.price) + price)
          );
          console.log("priceMap", priceMap);

          ////////////////////discounts////////////////////

          if (discounts.length > 0) {
            console.log("tedad", typeof productCount);
            let length = discounts.length;
            let flag = false;
            discounts.map((count) => {
              let quantity = parseInt(count.quantity);
              let percent = parseFloat(count.percent);

              if (quantity === productCount) {
                setDiscountsPercent(percent);
                flag = true;
              }
            });
            // console.log("discountsPercent", discountsPercent);

            if (discountsPercent && flag) {
              setOptionPriceDiscount(optionPrice - discountsPercent);
              setPriceMap(
                priceMap.set(
                  "OptionPriceDiscount",
                  optionPrice - discountsPercent
                )
              );

              console.log("priceMapi", priceMap);
              flag = false;
              // console.log("result with discount", optionPriceDiscount);
            } else if (
              flag == false &&
              productCount > parseInt(discounts[length - 1].quantity)
            ) {
              setOptionPriceDiscount(
                optionPrice - discounts[length - 1].percent
              );

              setPriceMap(
                priceMap.set(
                  "OptionPriceDiscount",
                  optionPrice - discounts[length - 1].percent
                )
              );
              console.log("priceMapiii", priceMap);
              // console.log(
              //   "we have discount with last one",
              //   optionPriceDiscount
              // );
            } else if (
              flag == false &&
              productCount < parseInt(discounts[length - 1].quantity)
            ) {
              setOptionPriceDiscount(optionPrice);

              setPriceMap(priceMap.set("OptionPriceDiscount", optionPrice));
              console.log("priceMapii", priceMap);
            }
          }
          ///////////////////delivery//////////////////////
          if (delivery.length > 0) {
            if (discounts.length > 0 && optionPriceDiscount > 0) {
              setDeliveryPrice(parseInt(division) * optionPrice);
              setOptDel(optionPriceDiscount + deliveryPrice);
              setPriceMap(
                priceMap.set(
                  "OptionPriceDiscount",
                  optionPriceDiscount + deliveryPrice
                )
              );
              console.log("priceMap", priceMap);
            } else {
              setDeliveryPrice(parseInt(division) * optionPrice);

              setOptDel(optionPrice + deliveryPrice);
              setPriceMap(priceMap.set("option", optionPrice + deliveryPrice));
              console.log("priceMap", priceMap);
            }
          }
          //////////////////service///////////////
          if (services.length > 0) {
            setPriceMap(
              priceMap.set(
                "OptionPriceDiscount",
                optionPriceDiscount + servicePrice
              )
            );
            setPriceMap(priceMap.set("option", optionPrice + servicePrice));
            console.log("priceMap", priceMap);
          }
        } else {
          setBlur(true);
        }
      })

      .catch((error) => {
        // handle error
      });
  }, [
    productSlug,
    select,
    selectArr,
    optionPrice,
    deliveryPrice,
    discounts,
    optDel,
    division,
    productCount,
    discountsPercent,
    optionPriceDiscount,
    discounts,
    priceMap,
    servicePrice,
  ]);

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

  ////////////////////////////////////////////////////
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
  const openMenu = useSelector((state) => state.menuToggle.menuOpen);


  //Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <MegaMenu />
        {/* <pre>{JSON.stringify(dateCalculation(sum(duration)))}</pre> */}
        <Breadcrumb breadcrumb={breadcrumb} path={path} />

        <ContainerInfo>
          <Wrapper>
            <Product>
              {showDefaultImg ? (
                <Img
                  src={`https://new-api.sevendisplays.com/storage/image/product/combination/${wordData?.path}`}
                  style={{ filter: blur ? "blur(2px)" : "none" }}
                />
              ) : (
                <Img
                  src={`https://new-api.sevendisplays.com/storage/image/portfolio/${wordData?.path}`}
                  style={{ filter: blur ? "blur(2px)" : "none" }}
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
                <SwiperContainer openMenu={openMenu}>
                  {" "}
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
                    // style={{
                    //   width: "50rem",
                    //   height: "110px",
                    //   borderBottom: "2px solid #ddd",
                    //   borderTop: "2px solid #ddd",
                    //   backgroundColor: "pink",
                    // }}
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
                </SwiperContainer>
              ) : (
                ""
              )}

              <Link
                onClick={handleOpen}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ModalButton onClick={handleOpen}>
                  <CalculateIcon style={{ margin: "5px" }} />
                  Jetzt konfigurieren
                </ModalButton>
              </Link>
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

              {defaultOption_values.length === 0 && options && (
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
              {delivery.length != 0 && (
                <Delivery>
                  <SelectContainer>
                    <label>Lieferung</label>
                    <select
                      disabled={blur ? true : null}
                      style={{ padding: "5px", width: "100%" }}
                      // value={select}

                      onChange={(e) => {
                        // setDuration(parseInt(e.currentTarget.value));

                        let value = e.currentTarget.value;
                        console.log(value.split("%"));
                        // setDuration(parseInt(value.split("%")[0]));
                        setDuration(
                          duration.set(
                            "delivery",
                            parseInt(value.split("%")[0])
                          )
                        );
                        setTotalDuration(dateCalculation(sum(duration)));
                        console.log("duration", duration);
                        setDivision(parseInt(value.split("%")[1]));
                      }}
                    >
                      {delivery.map((del) => {
                        let division = parseInt(del?.pivot?.price) / 100;
                        // console.log("division", division);
                        let deliveryPrice = division * optionPrice;

                        return (
                          <option
                            key={del.duration_translation.id}
                            value={`${del.duration}%${division}`}
                          >
                            {division > 0
                              ? `${
                                  del.duration_translation.title
                                } (+${numberWithCommas(
                                  (division * optionPrice).toFixed(2)
                                )} €)`
                              : `${del.duration_translation.title}`}
                          </option>
                        );
                      })}
                    </select>
                  </SelectContainer>
                </Delivery>
              )}
              {services.length != 0 && (
                <Services>
                  {services.map((service) => {
                    if (service?.pivot?.has_no_select == "0") {
                      return (
                        <SelectContainer key={service.id}>
                          <label>{service?.service_tranlation?.title}</label>
                          <select
                            style={{ padding: "5px", width: "100%" }}
                            disabled={blur ? true : null}
                            onChange={(e) => {
                              let value = e.currentTarget.value;
                              setDuration(
                                duration.set(
                                  "service",
                                  parseInt(value.split("%")[0])
                                )
                              );
                              setTotalDuration(dateCalculation(sum(duration)));

                              setServicePrice(parseInt(value.split("%")[1]));
                            }}
                          >
                            {service?.service_value?.map((item) => (
                              <option
                                key={item.id}
                                value={`${item.duration}%${item.price}`}
                              >
                                {item.price > 0
                                  ? `${
                                      item?.service_value_translation?.title
                                    } (+${numberWithCommas(
                                      parseFloat(item.price).toFixed(2)
                                    )} €)`
                                  : `${item?.service_value_translation?.title}`}
                              </option>
                            ))}
                          </select>
                        </SelectContainer>
                      );
                    } else {
                      return (
                        <SelectContainer key={service.id}>
                          <label>{service?.service_tranlation?.title}</label>
                          <select
                            style={{ padding: "5px", width: "100%" }}
                            disabled={blur ? true : null}
                            // value={select}
                            onChange={(e) => {
                              let value = e.currentTarget.value;

                              setDuration(
                                duration.set(
                                  "service",
                                  parseInt(value.split("%")[0])
                                )
                              );
                              setTotalDuration(dateCalculation(sum(duration)));

                              setServicePrice(parseInt(value.split("%")[1]));
                            }}
                          >
                            <option value={0}>- Nichts ausgewählt -</option>
                            {service?.service_value?.map((item) => (
                              <option
                                key={item.id}
                                value={`${item.duration}%${item.price}`}
                              >
                                {item.price > 0
                                  ? `${
                                      item?.service_value_translation?.title
                                    } (+${numberWithCommas(
                                      parseFloat(item.price).toFixed(2)
                                    )} €)`
                                  : `${item?.service_value_translation?.title}`}
                              </option>
                            ))}
                          </select>
                        </SelectContainer>
                      );
                    }
                  })}
                </Services>
              )}
              <Information style={{ opacity: blur ? "80%" : "100%" }}>
                <InformationTop>
                  <InformationTopLeft>
                    <p>Anzahl</p>
                    <Input
                      defaultValue={1}
                      disabled={blur ? true : null}
                      onChange={(e) =>
                        setProductCount(parseInt(e.target.value))
                      }
                    />
                  </InformationTopLeft>
                  <InformationTopRight>
                    <p>
                      Lieferung bis <strong>{dayName}</strong>
                    </p>
                    <p style={{ color: "#00ff48" }}>{totalDuration}</p>
                  </InformationTopRight>
                </InformationTop>
                <InformationBottom>
                  <p>Stückpreis</p>
                  {priceMap.size > 0 && discounts.length != 0 ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <del>
                        <strong>
                          {numberWithCommas(
                            parseFloat(priceMap.get("option")).toFixed(2)
                          )}{" "}
                          €*
                        </strong>
                      </del>
                      <strong>
                        {numberWithCommas(
                          parseFloat(
                            priceMap.get("OptionPriceDiscount")
                          ).toFixed(2)
                        )}{" "}
                        €*
                      </strong>
                    </div>
                  ) : (
                    <strong>
                      {numberWithCommas(
                        parseFloat(priceMap.get("option")).toFixed(2)
                      )}{" "}
                      €*
                    </strong>
                  )}
                </InformationBottom>
              </Information>
              <BottomSection style={{ opacity: blur ? "80%" : "100%" }}>
                <TotalPrice>
                  <p
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Gesamtbetrag
                  </p>
                  {priceMap.size > 0 && discounts.length != 0 ? (
                    <strong style={{ fontSize: "25px" }}>
                      {numberWithCommas(
                        parseFloat(
                          priceMap.get("OptionPriceDiscount") *
                            parseInt(productCount)
                        ).toFixed(2)
                      )}{" "}
                      €*
                    </strong>
                  ) : (
                    <strong style={{ fontSize: "25px" }}>
                      {numberWithCommas(
                        parseFloat(
                          priceMap.get("option") * parseInt(productCount)
                        ).toFixed(2)
                      )}{" "}
                      €*
                    </strong>
                  )}
                </TotalPrice>
                <Button disabled={blur ? true : null}>
                  <ShoppingCartIcon style={{ marginRight: "7px" }} />
                  In Den Warenkorb
                </Button>
              </BottomSection>
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
          {showButton && <ScrollUp />}
          {/* Modal */}
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <ProductCalculatorModal style={{ ...style, width: 600 }}>
              <ModalHeader>
                <ModalTitle>{modalTitle}</ModalTitle>

                <CloseIcon
                  onClick={handleClose}
                  sx={{ cursor: "pointer", color: "white" }}
                />
              </ModalHeader>

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

              {defaultOption_values.length === 0 && options && (
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
              {delivery.length != 0 && (
                <Delivery>
                  <SelectContainer>
                    <label>Lieferung</label>
                    <select
                      disabled={blur ? true : null}
                      style={{ padding: "5px", width: "100%" }}
                      // value={select}

                      onChange={(e) => {
                        // setDuration(parseInt(e.currentTarget.value));

                        let value = e.currentTarget.value;
                        console.log(value.split("%"));
                        // setDuration(parseInt(value.split("%")[0]));
                        setDuration(
                          duration.set(
                            "delivery",
                            parseInt(value.split("%")[0])
                          )
                        );
                        setTotalDuration(dateCalculation(sum(duration)));
                        console.log("duration", duration);
                        setDivision(parseInt(value.split("%")[1]));
                      }}
                    >
                      {delivery.map((del) => {
                        let division = parseInt(del?.pivot?.price) / 100;
                        // console.log("division", division);
                        let deliveryPrice = division * optionPrice;

                        return (
                          <option
                            key={del.duration_translation.id}
                            value={`${del.duration}%${division}`}
                          >
                            {division > 0
                              ? `${
                                  del.duration_translation.title
                                } (+${numberWithCommas(
                                  (division * optionPrice).toFixed(2)
                                )} €)`
                              : `${del.duration_translation.title}`}
                          </option>
                        );
                      })}
                    </select>
                  </SelectContainer>
                </Delivery>
              )}
              {services.length != 0 && (
                <Services>
                  {services.map((service) => {
                    if (service?.pivot?.has_no_select == "0") {
                      return (
                        <SelectContainer key={service.id}>
                          <label>{service?.service_tranlation?.title}</label>
                          <select
                            style={{ padding: "5px", width: "100%" }}
                            disabled={blur ? true : null}
                            onChange={(e) => {
                              let value = e.currentTarget.value;
                              setDuration(
                                duration.set(
                                  "service",
                                  parseInt(value.split("%")[0])
                                )
                              );
                              setTotalDuration(dateCalculation(sum(duration)));

                              setServicePrice(parseInt(value.split("%")[1]));
                            }}
                          >
                            {service?.service_value?.map((item) => (
                              <option
                                key={item.id}
                                value={`${item.duration}%${item.price}`}
                              >
                                {item.price > 0
                                  ? `${
                                      item?.service_value_translation?.title
                                    } (+${numberWithCommas(
                                      parseFloat(item.price).toFixed(2)
                                    )} €)`
                                  : `${item?.service_value_translation?.title}`}
                              </option>
                            ))}
                          </select>
                        </SelectContainer>
                      );
                    } else {
                      return (
                        <SelectContainer key={service.id}>
                          <label>{service?.service_tranlation?.title}</label>
                          <select
                            style={{ padding: "5px", width: "100%" }}
                            disabled={blur ? true : null}
                            // value={select}
                            onChange={(e) => {
                              let value = e.currentTarget.value;

                              setDuration(
                                duration.set(
                                  "service",
                                  parseInt(value.split("%")[0])
                                )
                              );
                              setTotalDuration(dateCalculation(sum(duration)));

                              setServicePrice(parseInt(value.split("%")[1]));
                            }}
                          >
                            <option value={0}>- Nichts ausgewählt -</option>
                            {service?.service_value?.map((item) => (
                              <option
                                key={item.id}
                                value={`${item.duration}%${item.price}`}
                              >
                                {item.price > 0
                                  ? `${
                                      item?.service_value_translation?.title
                                    } (+${numberWithCommas(
                                      parseFloat(item.price).toFixed(2)
                                    )} €)`
                                  : `${item?.service_value_translation?.title}`}
                              </option>
                            ))}
                          </select>
                        </SelectContainer>
                      );
                    }
                  })}
                </Services>
              )}
              <Information style={{ opacity: blur ? "80%" : "100%" }}>
                <InformationTop>
                  <InformationTopLeft>
                    <p>Anzahl</p>
                    <Input
                      defaultValue={1}
                      disabled={blur ? true : null}
                      onChange={(e) =>
                        setProductCount(parseInt(e.target.value))
                      }
                    />
                  </InformationTopLeft>
                  <InformationTopRight>
                    <p>
                      Lieferung bis <strong>{dayName}</strong>
                    </p>
                    <p style={{ color: "#00ff48" }}>{totalDuration}</p>
                  </InformationTopRight>
                </InformationTop>
                <InformationBottom>
                  <p>Stückpreis</p>
                  {priceMap.size > 0 && discounts.length != 0 ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <del>
                        <strong>
                          {numberWithCommas(
                            parseFloat(priceMap.get("option")).toFixed(2)
                          )}{" "}
                          €*
                        </strong>
                      </del>
                      <strong>
                        {numberWithCommas(
                          parseFloat(
                            priceMap.get("OptionPriceDiscount")
                          ).toFixed(2)
                        )}{" "}
                        €*
                      </strong>
                    </div>
                  ) : (
                    <strong>
                      {numberWithCommas(
                        parseFloat(priceMap.get("option")).toFixed(2)
                      )}{" "}
                      €*
                    </strong>
                  )}
                </InformationBottom>
              </Information>
              <BottomSection style={{ opacity: blur ? "80%" : "100%" }}>
                <TotalPrice>
                  <p
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Gesamtbetrag
                  </p>
                  {priceMap.size > 0 && discounts.length != 0 ? (
                    <strong style={{ fontSize: "25px" }}>
                      {numberWithCommas(
                        parseFloat(
                          priceMap.get("OptionPriceDiscount") *
                            parseInt(productCount)
                        ).toFixed(2)
                      )}{" "}
                      €*
                    </strong>
                  ) : (
                    <strong style={{ fontSize: "25px" }}>
                      {numberWithCommas(
                        parseFloat(
                          priceMap.get("option") * parseInt(productCount)
                        ).toFixed(2)
                      )}{" "}
                      €*
                    </strong>
                  )}
                </TotalPrice>
                <Button disabled={blur ? true : null}>
                  <ShoppingCartIcon style={{ marginRight: "7px" }} />
                  In Den Warenkorb
                </Button>
              </BottomSection>
            </ProductCalculatorModal>
          </Modal>
        </ContainerInfo>
      </Container>
    </>
  );
};

export default SingleProduct;
