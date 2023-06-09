import React, { useEffect, useState } from "react";
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

function Breadcrumb({
  breadcrumb,
  setBreadcrumb,
  productTitle,
  productSlug,
  path,
}) {
  // console.log(path.split("/")[1])
  useEffect(() => {
    if (productTitle && productSlug) {
    
      setBreadcrumb((result) => [
        ...result,
        {
          title: productTitle,
          slug: productSlug,
          level: "3",
        },
      ]);
    }
  }, [productTitle, productSlug]);

  const breadCrumbLength = breadcrumb.length;

  return (
    <>
      <Container>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              href="/"
              style={{ textDecoration: "none", color: "black" }}
            >
              <HomeIcon />
            </Link>
            {breadcrumb &&
              path &&
              breadcrumb.map((b) => {
                if (parseInt(b.level) === breadCrumbLength) {
                  return (
                    <Typography color="text.primary">{b.title}</Typography>
                  );
                } else if (parseInt(b.level) === breadCrumbLength - 1) {
                 
                  let item = b.slug.charAt(0).toUpperCase() + b.slug.slice(1);
                  let Slug = item.split("-");
                  for (let i = 0; i < Slug.length; i++) {
                    Slug[i] = Slug[i][0].toUpperCase() + Slug[i].substr(1);
                  }
                  Slug = Slug.join("-");

                  return (
                    <Link
                      underline="hover"
                      href={`/${path.split("/")[1]}/${Slug}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {b.title}
                    </Link>
                  );
                } else {
                  let item = b.slug.charAt(0).toUpperCase() + b.slug.slice(1);
                  let Slug = item.split("-");
                  for (let i = 0; i < Slug.length; i++) {
                    Slug[i] = Slug[i][0].toUpperCase() + Slug[i].substr(1);
                  }
                  Slug = Slug.join("-");

                  return (
                    <Link
                      underline="hover"
                      href={`/${Slug}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {b.title}
                    </Link>
                  );
                }
              })}
            {breadcrumb &&
              !path &&
              breadcrumb.map((b) => {
                if (parseInt(b.level) === breadCrumbLength) {
                  return (
                    <Typography color="text.primary">{b.title}</Typography>
                  );
                } else {
                  let item = b.slug.charAt(0).toUpperCase() + b.slug.slice(1);
                  let Slug = item.split("-");
                  for (let i = 0; i < Slug.length; i++) {
                    Slug[i] = Slug[i][0].toUpperCase() + Slug[i].substr(1);
                  }
                  Slug = Slug.join("-");

                  return (
                    <Link
                      underline="hover"
                      href={`/${Slug}`}
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
