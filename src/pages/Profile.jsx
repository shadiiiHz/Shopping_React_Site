import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import Announcement from "../components/announcment/Announcement";
import MegaMenu from "../components/menu/MegaMenu";
import Navbar from "../components/navbar/Navbar";
import ScrollUp from "../components/scroll up/ScrollUp";
import { mobile } from "../responsive";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { logout } from "../redux/userRedux";
import Profiles from "../components/profile/Profiles";
import Orders from "../components/profile/Orders";
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
const Wrapper = styled.div`
  display: flex;
  margin: 0px 100px;
`;

const CardContainer = styled.div`
  flex: 9;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: white;
  margin-left: 20px;
`;

const Sidebar = styled.div`
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
const Icon = styled.div`
  margin: 15px 30px 10px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Title = styled.h5`
  font-weight: 500;
  margin-left: 5px;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;

  justify-content: start;
`;
const Li = styled.li`
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  margin: 5px 50px 5px 0px;
  padding: 10px 0px;
  &:hover {
    color: #fd7e14;
  }
`;

function Profile() {
  const location = useLocation();
  const option = location.pathname.split("/")[2];

  const [showButton, setShowButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Übersicht");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
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
        `https://new-api.sevendisplays.com/api/v1/user/dashboard/invoices/search?page=1`,
        configuration
      )
      .then((response) => {
        console.log(response.data.body.data);
        setData(response.data.body.data);
      })
      .catch((error) => {
        // handle error
      });
  }, []);
  useEffect(() => {
    switch (option) {
      case undefined:
        setSelectedOption("Übersicht");
        break;
      case "orders":
        setSelectedOption("Bestellungen");
        break;
      case "settings":
        setSelectedOption("Einstellungen");
        break;
      case "change-password":
        setSelectedOption("Password ändern?");
        break;
      case "subscription":
        setSelectedOption("Registrierung");
        break;
    }
  }, []);
  function logoutUser() {
    dispatch(logout());
    navigate("/");
  }
  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <MegaMenu />

        <Wrapper>
          <Sidebar>
            <Icon>
              <PersonOutlineIcon sx={{ color: "orange" }} />{" "}
              <Title>KUNDENPROFIL</Title>
            </Icon>
            <Ul>
              <Link
                style={{
                  textDecoration: "none",
                  color: "Übersicht" === selectedOption ? "orange" : "black",
                }}
                onClick={() => setSelectedOption("Übersicht")}
                to="/profile"
              >
                <Li>
                  <ArrowRightIcon sx={{ height: "13px", weight: "13px" }} />
                  Übersicht
                </Li>
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "Bestellungen" === selectedOption ? "orange" : "black",
                }}
                onClick={() => setSelectedOption("Bestellungen")}
                to="/profile/orders"
              >
                <Li>
                  <ArrowRightIcon sx={{ height: "13px", weight: "13px" }} />
                  Bestellungen
                </Li>
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color:
                    "Einstellungen" === selectedOption ? "orange" : "black",
                }}
                onClick={() => setSelectedOption("Einstellungen")}
                to="/profile/settings"
              >
                <Li>
                  <ArrowRightIcon sx={{ height: "13px", weight: "13px" }} />
                  Einstellungen
                </Li>
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color:
                    "Password ändern?" === selectedOption ? "orange" : "black",
                }}
                onClick={() => setSelectedOption("Password ändern?")}
                to="/profile/change-password"
              >
                <Li>
                  <ArrowRightIcon sx={{ height: "13px", weight: "13px" }} />
                  Password ändern?
                </Li>
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color:
                    "Registrierung" === selectedOption ? "orange" : "black",
                }}
                onClick={() => setSelectedOption("Registrierung")}
                to="/profile/subscription"
              >
                <Li>
                  <ArrowRightIcon sx={{ height: "13px", weight: "13px" }} />
                  Registrierung
                </Li>
              </Link>
              <Link
                to="/"
                style={{ textDecoration: "none", color: "black" }}
                onClick={logoutUser}
              >
                <Li>
                  <ArrowRightIcon sx={{ height: "13px", weight: "13px" }} />
                  Ausloggen
                </Li>
              </Link>
            </Ul>
          </Sidebar>
          <CardContainer>
            {option === undefined && <Profiles />}
            {option === "orders" && <Orders data={data} />}
          </CardContainer>
        </Wrapper>
        {showButton && <ScrollUp />}
      </Container>
    </>
  );
}

export default Profile;
