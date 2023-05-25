import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMegaMenu } from "../../redux/apiCalls";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
const Container = styled.div`
  flex: 3;

  padding-bottom: 30px;
  background-color: #fdfbfb;
  border: 1px solid #e9e9e9;
  display: flex;
  flex-direction: column;
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
const P = styled.p`
  font-weight: 500;
  margin-top: 10px;

  &:hover {
    color: #fd7e14;
  }
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;

  justify-content: start;
`;
const Li = styled.li`
  &:hover {
    color: #fd7e14;
  }
`;
function Sidebar() {
  const dispatch = useDispatch();
  const megaMenu = useSelector((state) => state.megaMenu.megaMenu);
  const [menu, setmenu] = useState([]);
  useEffect(() => {
    getMegaMenu(dispatch);
    setmenu(megaMenu);
  }, []);
  return (
    <>
      <Container>
        <Icon>
          <MenuIcon sx={{ color: "orange" }} /> <Title>UNSERE PRODUKTE</Title>
        </Icon>
        {menu.map((m) => {
          return (
            <>
              <Ul key={m.menu_id}>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <P>{m.title}</P>
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
                      >
                        <Li key={c.slug}>
                          <ArrowRightIcon
                            sx={{ height: "13px", weight: "13px" }}
                          />
                          {c.title}
                        </Li>
                      </Link>
                    );
                  })}
              </Ul>
            </>
          );
        })}
      </Container>
    </>
  );
}

export default Sidebar;
