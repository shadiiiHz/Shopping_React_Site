import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/announcment/Announcement";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import MegaMenu from "../components/menu/MegaMenu";
import Navbar from "../components/navbar/Navbar";
import ScrollUp from "../components/scroll up/ScrollUp";
import Sidebar from "../components/sidbar/Sidebar";
import SubMenuChild from "../components/subMenuChild/SubMenuChild";
import { mobile } from "../responsive";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${mobile({
    width: "100vh",
    justifyContent: "center",
    alignItems: "center",
  })}
`;
const Wrapper = styled.div`
  display: flex;
  margin: 0px 100px;
`;
const Children = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  background-color: white;
  ${mobile({
    alignItems: "center",
    margin: " 0 auto",
  })}
`;
const DesChildren = styled.div`
  flex: 9;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: white;
`;
const CoverImage = styled.img`
  margin: 0px 100px;
  height: 400px;
  width: 1320px;
`;
const Section = styled.div`
  margin: 30px 100px 0px 100px;
  a{
    text-decoration: none;
  }
`;
function SubMenuChildren() {
  ////////////slug////////////
  const location = useLocation();
  let slug = location.pathname.split("/")[2];
 
  slug = slug.charAt(0).toLowerCase() + slug.slice(1);
  let Slug = slug.split("-");
  for (let i = 0; i < Slug.length; i++) {
    Slug[i] = Slug[i][0].toLowerCase() + Slug[i].substr(1);
  }
  Slug = Slug.join("-");
  //   console.log(Slug);

  const [breadcrumb, setBreadcrumb] = useState([]);
  const [text, setText] = useState("");
  const [product, setProduct] = useState([]);
  const [cover_image, setCover_image] = useState("");

  const [showButton, setShowButton] = useState(false);
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
  }, [window.pageYOffset]);

  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/middle-page/products/${Slug}?per_page=30&order_by=DESC`
      )
      .then((response) => {
        // console.log(response.data.body);
        setProduct(response.data.body.data);
      })
      .catch((error) => {
        // handle error
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/menus/fetch/${Slug}`
      )
      .then((response) => {
        setText(response.data.body.description);
        setCover_image(response?.data?.body?.cover_image[0]?.path);
    
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://new-api.sevendisplays.com/api/v1/user/site/menus/fetch/menu/breadcrumb?menu_slug=${Slug}`
      )
      .then((response) => {
        //   console.log(response.data.body);
        setBreadcrumb(response.data.body);
      })
      .catch((error) => {
        // handle error
      });
  }, []);
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

  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <MegaMenu />
        {cover_image !== undefined ? (
          <CoverImage
            src={`https://new-api.sevendisplays.com/storage/image/menu/${cover_image}`}
          ></CoverImage>
        ) : (
          ""
        )}
        <Breadcrumb breadcrumb={breadcrumb} />
        <Wrapper>
          <Sidebar />
          <DesChildren>
            <Children>
              {product.map((p , index) => {
                return (
                  <SubMenuChild
                    slug={slug}
                  
                    product={product[index]}
                    key={p.product_id}
                  />
                );
              })}
            </Children>
          </DesChildren>
        </Wrapper>
        <Section
          dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(text) }}
        />
        {showButton && <ScrollUp />}
      </Container>
    </>
  );
}

export default SubMenuChildren;
