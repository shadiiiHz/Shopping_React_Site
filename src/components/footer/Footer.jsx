import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #333333;
  height: 500px;

  ${mobile({  height:" 1100px" ,  width: "100vh"})}
`;
const Top = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  ${mobile({ flexDirection: "column" , alignItems: "center" , marginTop: "20px"})}
`;
const Bottom = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  margin: 30px 0px;
  ${mobile({ justifyContent: "start",  flexDirection: "column" })}
`;
const BottomSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ justifyContent: "start" })}
`;
const Image = styled.img`
  width: 200px;
  height: 30px;
  cursor: pointer;
`;
const BottomSectionTitle = styled.h1`
  color: #f8f9fa;
  margin: 10px 2px;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Section = styled.div`
  flex: 1;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 30px 70px;
  ${mobile({  alignItems: "center" , justifyContent: "start" , width: "300px" , margin: "10px 50px" })}
`;
const SectionTitle = styled.h1`
  color: #fc6c00;
  margin: 10px 2px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Pages = styled.h4`
  color: #f8f9fa;
  margin: 5px 2px;
  font-size: 14px;
  font-family: "Lora", sans-serif;
  ${mobile({  marginBottom: "10px" })}
`;
const Logo = styled.img`
  width: 170px;
  height: 30px;
  cursor: pointer;
`;

function Footer() {
  const [footerSection, setFooterSection] = useState([]);
  useEffect(() => {
    axios
      .get(`https://new-api.sevendisplays.com/api/v1/user/site/footer/fetch`)
      .then((response) => {
        // console.log(response.data.body);
        setFooterSection(response.data.body);
      })
      .catch((error) => {
        // handle error
      });
  }, []);
  return (
    <Container>
      <Top>
        {footerSection &&
          footerSection.map((section) => {
            return (
              <Section key={section.footer_section_id}>
                <SectionTitle>{section.title}</SectionTitle>
                {section.pages &&
                  section.pages.map((page) => {
                    return (
                      <Link style={{ textDecoration: "none" }} key={page.id}>
                        <Pages>{page.title}</Pages>
                      </Link>
                    );
                  })}
              </Section>
            );
          })}
        <Section>
          <Logo src={require("../../images/SDLogo-white.png")}></Logo>
        </Section>
      </Top>
      <Bottom>
        <BottomSection>
          <BottomSectionTitle>EINFACHE UND SICHERE ZAHLUNG</BottomSectionTitle>
          <Image  src={require("../../images/logo-payment-method.png")} />
        </BottomSection>
        <BottomSection>
          <BottomSectionTitle>WIR LIEFERN MIT</BottomSectionTitle>
          <Image src={require("../../images/logo-shipping-method.png")} />
        </BottomSection>
      </Bottom>
    </Container>
  );
}

export default Footer;
