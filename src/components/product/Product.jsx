import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  max-width: 280px;
  height: 350px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #fff;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  &:hover {
    border-left: 3px solid #fc6c00;
    box-shadow: 0 0 10px #ccc;
  }
`;
const Title = styled.h1`
  color: black;
  margin: 10px 0px;
  font-size: 18px;
  font-weight: bold;
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20%;
  width: 66%;
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
const Image = styled.img`
  height: 50%;
  width: 90%;
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
function Product({ product, index }) {
  // console.log()
  const route = product[
    index
  ].product_info.default_menu.menu_t.title.replaceAll(" ", "-");
  const parentRoute =
    product[index].product_info.default_menu.parent.menu_t.title;

  //translate to german
  function makeSortString(s) {
    var translate = {
      ä: "ae",
      ö: "o",
      ü: "u",
      Ä: "A",
      Ö: "O",
      Ü: "U", // probably more to come
    };
    var translate_re = /[öäüÖÄÜ]/g;
    return s.replace(translate_re, function (match) {
      return translate[match];
    });
  }
  //slug
  const slug = product[index].slug;
    let productSlug = slug.split("-");
    for (let i = 0; i < productSlug.length; i++) {
        productSlug[i] = productSlug[i][0].toUpperCase() + productSlug[i].substr(1);
    }
    productSlug = productSlug.join("-");

  return (
    <>
      <Container>
        <Title>{product[index].title}</Title>
        <Image
          src={`https://new-api.sevendisplays.com/storage/image/product/${product[index].product_info.cover_image}`}
        ></Image>
        <Price>
          <DeliveryDiningIcon />
          <PriceInfo>
            <PriceInfo>ab</PriceInfo>
            {product[index].product_info.price}
            <PriceInfo>€*</PriceInfo>
          </PriceInfo>
        </Price>
        <Link
          to={`${makeSortString(parentRoute)}/${route}/${productSlug}`}
          style={{ textDecoration: "none" }}
        >
          <Btn>
            Zur Produktseite
            <ArrowRightIcon />
          </Btn>
        </Link>
      </Container>
    </>
  );
}

export default Product;
