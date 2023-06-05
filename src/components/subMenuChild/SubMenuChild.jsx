import React, { useState } from "react";
import styled from "styled-components";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { keyframes } from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { mobile } from "../../responsive";
const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 290px;
  max-width: 290px;

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
    minWidth: "450px",
    maxWidth: "450px",
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
const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
`;
const Text = styled.h5`
  display: flex;
  align-items: center;
  margin-top: 5px;
  flex: 90%;
  width: 227px;
  font-size: 14px;
  font-weight: bold;

  height: 20px;
`;
const Image = styled.img`
  height: 40%;
  width: 95%;
`;
const Btn = styled.button`
  background-color: #333;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 26px;
  text-transform: uppercase;
  margin: 10px 0px 20px;
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
const ProductBenefits = styled.div`
  margin: 10px 10px 0px 0px;
`;
const Hr = styled.hr`
  margin-left: 15px;
  border-top: 1.5px solid black;

  width: 255px;
  border-width: 1.5px;
`;
const Delivery = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0px;
`;
const DeliveryType = styled.div`
  flex: 90%;
  width: 190px;
  font-size: 14px;
  font-weight: bold;
`;
const DeliveryDate = styled.div`
  flex: 10%;
  color: green;
  font-size: 13px;
  font-weight: bold;
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20%;
  width: 90%;
  margin-left: 15px;
`;
const PriceInfo = styled.div`
  color: black;
  margin: 10px 2px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function SubMenuChild({ slug, product }) {
  console.log(product);
  ///////////////////////date////////////////////
  const Working_day = product?.product_info?.working_day.length;
  const Duration = product?.product_info?.working_day[0]?.duration;

  const currentDate = new Date();
  var result = currentDate.setDate(currentDate.getDate() + Number(Duration));
  result = new Date(result);

  const date = `${
    result.getDate() < 10 ? `0${result.getDate()}` : `${result.getDate()}`
  }.${
    result.getMonth() < 10
      ? `0${result.getMonth() + 1}`
      : `${result.getMonth() + 1}`
  }.${result.getFullYear().toString().substr(-2)}`;
  // console.log(date);
  ////////////////////////////////////////////////////
  const [Error, setError] = useState(false);
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
  //   console.log("benefit_desc",decodeHTMLEntities(product.benefit_desc));
  //   console.log("item_desc",decodeHTMLEntities(product.item_desc));
  //   console.log("feature_desc",decodeHTMLEntities(product.feature_desc));
  return (
    <Container>
      <Title>{product.title}</Title>

      {Error ? (
        <ImgNotFound>
          <AnimatedBackground>
            <BackgroundMasker></BackgroundMasker>
          </AnimatedBackground>
        </ImgNotFound>
      ) : (
        <Image
          src={`https://new-api.sevendisplays.com/storage/image/product/${product?.product_info?.cover_image}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            setError(true);
          }}
        ></Image>
      )}
      <ProductBenefits
        dangerouslySetInnerHTML={{
          __html: decodeHTMLEntities(product.feature_desc),
        }}
      ></ProductBenefits>
      <Hr></Hr>
      <TextContainer>
        <Text>LIEFERZEIT UND LIEFERDATUM</Text>
        <ErrorOutlineIcon
          sx={{
            color: "orange",
            flex: "10%",
            alignSelf: "center",
            height: "30px",
          }}
        />
      </TextContainer>
      <Delivery>
        <DeliveryType>
          {product?.product_info?.working_day[0]?.duration_translation?.title}
        </DeliveryType>
        <DeliveryDate>({date})</DeliveryDate>
      </Delivery>
      <Price>
        <DeliveryDiningIcon />
        <PriceInfo>
          <PriceInfo>ab</PriceInfo>
          {product.product_info.price}
          <PriceInfo>€*</PriceInfo>
        </PriceInfo>
      </Price>
      {/* <Link to={`${ChildSlug}`} style={{ textDecoration: "none" }}> */}

      <Btn>
        Zur Produktseite
        <ArrowRightIcon />
      </Btn>
      {/* </Link> */}
    </Container>
  );
}

export default SubMenuChild;
