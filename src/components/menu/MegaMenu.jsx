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
import Burger from "../mobileMenu/Burger";

function MegaMenu() {
  const dispatch = useDispatch();
  const megaMenu = useSelector((state) => state.megaMenu.megaMenu);
  const [menu, setmenu] = useState([]);
  const [move, setMove] = useState(false);
  const user = useSelector((state) => state.user.isUser);
  let isUser = user;
  console.log(isUser)
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
              <div className="menu-overlay"></div>
              <nav className="menu ">
                <div className="mobile-menu-head">
                  <div className="go-back">
                    <i className="fa fa-angle-left"></i>
                  </div>
                  <div className="current-menu-title"></div>
                  <div className="mobile-menu-close">&times;</div>
                </div>

                <ul className="menu-main">
                  {/* <pre>{JSON.stringify(menu)} </pre> */}
                  {menu.map((m) => {
                    return (
                      <li className="menu-item-has-children" key={m.menu_id}>
                        <a
                          href={`/${
                            m.slug.charAt(0).toUpperCase() + m.slug.slice(1)
                          }`}
                        >
                          {/* href={`/${m.slug.charAt(0).toUpperCase() + m.slug.slice(1)}`} */}
                          {m.title.toUpperCase() + " "}
                          {m.children && <i className="fa fa-angle-down"></i>}
                        </a>
                        <div className="sub-menu mega-menu mega-menu-column-4">
                          {m.children &&
                            m.children.map((mc) => {
                              let ChildSlug = mc.slug.split("-");
                              for (let i = 0; i < ChildSlug.length; i++) {
                                ChildSlug[i] =
                                  ChildSlug[i][0].toUpperCase() +
                                  ChildSlug[i].substr(1);
                              }
                              ChildSlug = ChildSlug.join("-");
                              return (
                                <div
                                  className="list-item text-center"
                                  key={mc.slug}
                                >
                                  <a
                                    href={`/${
                                      m.slug.charAt(0).toUpperCase() +
                                      m.slug.slice(1)
                                    }/${ChildSlug}`}
                                  >
                                    <img
                                      src={`https://new-api.sevendisplays.com/storage/image/menu/${mc.thumbnail_image}`}
                                      alt="new Product"
                                    />
                                    <h4 className="title">{mc.title}</h4>
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
                          style={{ color: "white", margin: "2px" }}
                        />
                        0221 - 222 045 88
                      </li>
                      <li
                        className="menu-item-has-children dismobile"
                        style={{ color: "white" }}
                      >
                        <EmailOutlinedIcon
                          style={{ color: "white", margin: "2px" }}
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
             
              <div className="mobile-menu-trigger">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Burger menu={menu} />
    </>
  );
}

export default MegaMenu;
