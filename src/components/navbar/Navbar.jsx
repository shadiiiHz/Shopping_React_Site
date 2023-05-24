import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  margin:  0px 100px;
  height: 100px;
  ${mobile({ flexDirection: "column" , height: "200px" ,justifyContent: "center"})}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: #959180;
 
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
 
`;

const Logo = styled.img`
  width: 300px;
  height: 150px;
  ${mobile({   width: "250px"})}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({  justifyContent: "center" , margin: " 0px 30px"})}
`;

const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;
const SearchContainer = styled.div`
  border: 0.5px solid #959180;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius: 8px;
  ${mobile({ display: "none" })}
`;
const Input = styled.input`
  color: gray;
  border: none;
  &:focus {
    outline: none;
  }


`;

function Navbar() {
  const user = useSelector((state) => state.user.isUser);
  // console.log(admin);
  let isUser = user;
  const [move, setMove] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setMove(window.pageYOffset > 100)
      );
    }
  }, [window.pageYOffset]);

  return (
    <>
     
   
        <Container>
          <Left>
            <Logo src="https://new.sevendisplays.com/_nuxt/img/seven-logo.921eb25.svg"></Logo>
          </Left>
          <Center>
            <SearchContainer>
              <Input
                placeholder="Suchbegriff(e) eingeben"
                style={{ flex: "90%" }}
              />
              <SearchIcon style={{ color: "black", fontSize: 30 }} />
            </SearchContainer>
          </Center>
          <Right>
            <MenuItems>
              <StarBorderIcon />
              Marklist
            </MenuItems>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItems>
                <PersonOutlineOutlinedIcon />
                {isUser ? "Logout" : "Login"}
              </MenuItems>
            </Link>
            <MenuItems>
              <Badge badgeContent={0} color="success">
                <ShoppingCartIcon />
              </Badge>
              Warenkorb
            </MenuItems>
          </Right>
        </Container>
  
    </>
  );
}

export default Navbar;
