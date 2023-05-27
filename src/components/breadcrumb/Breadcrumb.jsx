import React, { useState } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
const Container = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: white;
  margin: 0px 100px 12px;
`;

function Breadcrumb({ breadcrumb }) {
  // console.log(breadcrumb.length)
  const breadCrumbLength = breadcrumb.length;

  return (
    <>
      <Container>
        <div role="presentation" >
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              href="/"
              style={{ textDecoration: "none", color: "black" }}
            >
              <HomeIcon />
            </Link>
            {breadcrumb &&
              breadcrumb.map((b) => {
                if ( parseInt(b.level) === breadCrumbLength) {
                  return (
                    <Typography color="text.primary">{b.title}</Typography>
                  );
                } else {
                  return (
                    <Link
                      underline="hover"
                      href="/material-ui/getting-started/installation/"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {b.title}
                    </Link>
                  );
                }
              })}
          </Breadcrumbs>
        </div>
        {/* <Ol>
          {breadcrumb &&
            breadcrumb.map((b) => {
              return <Li>{b.title}</Li>;
            })}
        </Ol> */}
      </Container>
    </>
  );
}

export default Breadcrumb;
