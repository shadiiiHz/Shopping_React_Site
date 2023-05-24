import React, { useEffect, useState } from "react";
import "./MegaMenu.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMegaMenu } from "../../redux/apiCalls";
import StayPrimaryPortraitOutlinedIcon from "@mui/icons-material/StayPrimaryPortraitOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function MegaMenu() {
  const menuRef = useRef();
  const menuOverlayRef = useRef();
  const subMenuRef = useRef();
  const iRef = useRef();
  const titleRef = useRef();
  const currentMenuTitleRef = useRef();
  const mobileMenuHeadRef = useRef();
  const dispatch = useDispatch();
  const megaMenu = useSelector((state) => state.megaMenu.megaMenu);
  const [menu, setmenu] = useState([]);
  const [move, setMove] = useState(false);
  useEffect(() => {
    getMegaMenu(dispatch);
    setmenu(megaMenu);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setMove(window.pageYOffset > 100)
      );
    }
  }, [window.pageYOffset]);

  let subMenu;

  function showSubMenu(hasChildren) {
    // console.log("hasChildren.childNodes[1]", hasChildren.childNodes[1]);
    // subMenu = subMenuRef.current
    subMenu = hasChildren.childNodes[1];
    // console.log("subMenu", subMenu);
    subMenu.classList.add("active");
    subMenu.style.animation = "slideLeft 0.5s ease forwards";
    // const menuTitle = iRef.current.parentNode.childNodes[0].textContent;
    
    // currentMenuTitleRef.current.innerHTML = menuTitle;
    mobileMenuHeadRef.current.classList.add("active");
    const title = titleRef.current;

  }
  function hideSubMenu() {
    subMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() => {
      subMenu.classList.remove("active");
    }, 300);
    currentMenuTitleRef.current.innerHTML = "";
    mobileMenuHeadRef.current.classList.remove("active");
  }
  const handelMenu = (e) => {
    // console.log("2");
    if (!menuRef.current.classList.contains("active")) {
      return;
    }
    if (e.target.closest(".menu-item-has-children")) {
      const hasChildren = e.target.closest(".menu-item-has-children");
      // console.log("hasChildren", hasChildren);
      showSubMenu(hasChildren);
    }
  };
  function toggleMenu() {
    // setTimeout(() => {
    menuRef.current.classList.toggle("active");
    // console.log(menuRef.current)
    menuOverlayRef.current.classList.toggle("active");
    // }, 1000);
  }
  window.onresize = function () {
    if (this.innerWidth > 991) {
      if (menuRef.current.classList.contains("active")) {
        // toggleMenu();
        console.log("hi");
      }
    }
  };

  return (
    <>
      <header className={`header ${move ? "move" : ""}`}>
        <div className="container">
          <div className="row v-center">
        

            <div className="header-item item-center">
              {move && (
                <div className="logo">
                  <img
                    src="https://new.sevendisplays.com/_nuxt/img/seven-symbol-white.1903050.svg"
                    alt=""
                  />
                </div>
              )}
              <div
                className="menu-overlay"
                ref={menuOverlayRef}
                onClick={toggleMenu}
              ></div>
              <nav className="menu " ref={menuRef}>
                <div className="mobile-menu-head" ref={mobileMenuHeadRef}>
                  <div className="go-back" onClick={hideSubMenu}>
                    <i className="fa fa-angle-left"></i>
                  </div>
                  <div
                    className="current-menu-title"
                    ref={currentMenuTitleRef}
                  ></div>
                  <div className="mobile-menu-close" onClick={toggleMenu}>
                    &times;
                  </div>
                </div>

                <ul className="menu-main" onClick={(e) => handelMenu(e)}>
                  {/* <pre>{JSON.stringify(menu)} </pre> */}
                  {menu.map((m) => {
                    return (
                      <li className="menu-item-has-children">
                        <a href="#" ref={titleRef}>
                          {m.title.toUpperCase() + " "}
                          {m.children && (
                            <i className="fa fa-angle-down" ref={iRef}></i>
                          )}
                        </a>
                        <div
                          className="sub-menu mega-menu mega-menu-column-4"
                          ref={subMenuRef}
                        >
                          {m.children &&
                            m.children.map((mc) => {
                              return (
                                <div className="list-item text-center">
                                  <a>
                                    <img
                                      src={`https://new-api.sevendisplays.com/storage/image/menu/${mc.thumbnail_image}`}
                                      alt="new Product"
                                    />
                                    <h4 className="title" >
                                      {mc.title}
                                    </h4>
                                  </a>
                                </div>
                              );
                            })}
                        </div>
                      </li>
                    );
                  })}
                  {move && (
                    <>
                      <li
                        className="menu-item-has-children dismobile"
                        style={{ color: "white" }}
                      >
                        <StayPrimaryPortraitOutlinedIcon
                          style={{ color: "white", margin: "3px" }}
                        />
                        0221 - 222 045 88
                      </li>
                      <li
                        className="menu-item-has-children dismobile"
                        style={{ color: "white" }}
                      >
                        <EmailOutlinedIcon
                          style={{ color: "white", margin: "3px" }}
                        />
                        info@sevendisplays.com
                      </li>
                      <li
                        className="menu-item-has-children dismobile"
                        style={{ color: "white" }}
                      >
                        <Badge badgeContent={0} color="success">
                          <ShoppingCartIcon />
                        </Badge>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>

            <div className="header-item item-right">
              {/* <img src="https://new.sevendisplays.com/_nuxt/img/seven-logo.921eb25.svg" alt="" /> */}
              <div className="mobile-menu-trigger" onClick={toggleMenu}>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default MegaMenu;
