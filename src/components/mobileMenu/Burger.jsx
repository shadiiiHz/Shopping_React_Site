import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { closeMenu, openMenu } from "../../redux/menuToggle";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 98px;
  right: 20px;
  z-index: 20;
  display: none;

  @media (max-width: 991px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
   
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#ccc" : "#333")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
const Ul = styled.ul`
  display: none;

  @media (max-width: 768px) {
    list-style: none;
    display: flex;
    overflow-y: auto;
    overflow-x: visible;
    flex-flow: column nowrap;
    background-color: #333333;
    position: fixed;
    opacity: 1;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    padding: 1.2rem 2rem;
 
    transition-delay: .2s;
    transition-duration: .6s;
}
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
      font-size: 17px;
      display: block;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
const P = styled.p`
  font-weight: 370;
  margin-top: 15px;
  font-size: 20px;
  color: #fd7e14;
  &:hover {
    text-decoration: underline;
  }
`;
const Image = styled.img`
  height: 30px;
  width: 150px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-top: 80px;
`;
const Burger = ({ menu }) => {
  const [open, setOpen] = useState(false);
 

  const dispatch = useDispatch();
  useEffect(() => {
    if (open) {
      dispatch(openMenu());
    } else {
      dispatch(closeMenu());
    }
  }, [open ,dispatch]);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
    

      <Ul open={open}>
        <Image src={require("../../images/SDLogo-white.png")}></Image>
        {menu &&
          menu.map((m) => {
            return (
              <>
                <Link style={{ textDecoration: "none", color: "black" }} key={m.slug}>
                  <P>{m.title.toUpperCase()}</P>
                </Link>
                {m.children &&
                  m.children.map((c) => {
                    let ChildSlug = c.slug.split("-");
                    for (let i = 0; i < ChildSlug.length; i++) {
                      ChildSlug[i] =
                        ChildSlug[i][0].toUpperCase() + ChildSlug[i].substr(1);
                    }
                    ChildSlug = ChildSlug.join("-");
                    const parentTitle =
                      m.slug.charAt(0).toUpperCase() + m.slug.slice(1);
                    return (
                      <Link
                        to={`/${parentTitle}/${ChildSlug}`}
                        style={{ textDecoration: "none", color: "black" }}
                        key={c.slug}
                      >
                        <li >
                          <RadioButtonUncheckedIcon
                            sx={{ height: "5px", weight: "5px" }}
                          />
                          {c.title}
                        </li>
                      </Link>
                    );
                  })}
              </>
            );
          })}
      </Ul>

    
    </>
  );
};

export default Burger;
