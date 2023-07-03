import React from "react";
import styled from "styled-components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { mobile } from "../../responsive";
const Button = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  font-size: 20px;
  bottom: 40px;
  right: 40px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  border: none;
  &:hover{
    background-color: #fd7e14;
  }
 
`;
function ScrollUp() {
  return (
    <Button
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <KeyboardArrowUpIcon />
    </Button>
  );
}

export default ScrollUp;
