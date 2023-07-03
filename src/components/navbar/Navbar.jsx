import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { login } from "../../redux/apiCalls";
import CloseIcon from "@mui/icons-material/Close";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  margin: 0px 100px;
  height: 100px;
  ${mobile({
    flexDirection: "column",
    height: "200px",
    justifyContent: "center",

  })}
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
  ${mobile({ display: "none" })}
`;

const Logo = styled.img`
  width: 300px;
  height: 150px;
  ${mobile({ width: "500px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center" })}
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
const SearchMenuItem = styled.div`
  opacity: 0;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ opacity: "1" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid #959180;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius: 8px;
`;
const Input = styled.input`
  color: gray;
  border: none;
  &:focus {
    outline: none;
  }
`;

const ModalHeader = styled.div`
  display: flex;

  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalInput = styled.input`
  outline: none;
  height: 40px;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;

  background-color: #fc6c00;
  color: white;
  cursor: pointer;
  height: 40px;
  margin: 0px 2px 10px 2px;
`;

const ModalLink = styled.a`
  margin: 5px 2px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: #fc6c00;
`;
const Error = styled.span`
  color: red;
`;
const Hr = styled.hr`
  margin-bottom: 60px;
`;
const Label = styled.label`
  flex: 1;
  margin: 2px;
`;
function logout() {
  localStorage.clear();
  window.location.reload(false);

}

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.isUser);
  // console.log(admin);
  let isUser = user;
  const [move, setMove] = useState(false);
  const [isShownSearch, setIsShownSearch] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setMove(window.pageYOffset > 100)
      );
    }
  }, [window.pageYOffset]);
  // const handleClickSearch = () => {
  //   setIsShownSearch((current) => !current);
  // };
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    handleClose();
    navigate("/profile")
  };
  return (
    <>
      <Container>
        <Left>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Logo src="https://new.sevendisplays.com/_nuxt/img/seven-logo.921eb25.svg"></Logo>
          </Link>
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
          <SearchMenuItem>
            <SearchIcon />
            Suche
          </SearchMenuItem>
          <MenuItems>
            <StarBorderIcon />
            Marklist
          </MenuItems>

          {isUser ? (
            <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
              <MenuItems >
                <PersonOutlineOutlinedIcon />
                Kundenprofil
              </MenuItems>
            </Link>
          ) : (
            <Link
              onClick={handleOpen}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItems>
                <PersonOutlineOutlinedIcon />
                Login
              </MenuItems>
            </Link>
          )}
          <MenuItems>
            <Badge badgeContent={0} color="success">
              <ShoppingCartIcon />
            </Badge>
            Warenkorb
          </MenuItems>
        </Right>
      </Container>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <ModalHeader>
            <Title>Login</Title>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </ModalHeader>
          <Hr />
          <Form>
            <Label>E-Mail</Label>
            <ModalInput
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label>Passwort</Label>
            <ModalInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ModalLink>Passwort vergessen?</ModalLink>
            <Button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </Button>
            {error && <Error>E-Mail or Passwort ist ein Pflichtfeld</Error>}

            <ModalLink>Registrierung</ModalLink>
          </Form>
        </Box>
      </Modal>
    </>
  );
}

export default Navbar;
