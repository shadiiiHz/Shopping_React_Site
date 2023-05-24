import styled from "styled-components";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { mobile } from "../../responsive";

const Container = styled.div`
  border-top: 1px solid #fc6c00;
  border-bottom: 2px solid #e9e9e9;
  min-height: 40px;
  background-color: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
  margin-right: 4px;
  ${mobile({ display: "none" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  color: black;
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;
const Img = styled.img`
  height: 24px;
  width: 24px;
  margin-left: 10px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: start;
  color: black;
`;

const Announcement = () => {
  return (
    <Container>
      <Left>
        <Icon>
          <AccessTimeOutlinedIcon
            style={{  marginRight: "3px"}}
          />
          24h Produktion
        </Icon>
        <Icon>
          <FactCheckOutlinedIcon style={{ marginRight: "3px" }} />
          Kostenloser Druckdatencheck
        </Icon>
        <Icon>
          <ForwardToInboxOutlinedIcon style={{ marginRight: "3px" }} />
          Kauf auf Rechnung
        </Icon>
      </Left>
      <Right>
        <Icon>
          <HeadsetMicOutlinedIcon style={{ marginRight: "3px" }} />
          0221 - 222 045 88
        </Icon>
        <Icon>
          <EmailOutlinedIcon style={{ marginRight: "3px" }} />
          info@sevendisplays.com
        </Icon>
        <Icon>
          <AccessTimeOutlinedIcon style={{ marginRight: "3px" }} />
          Mo. bis Fr. 08:30 - 17:00
        </Icon>
        <Img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAACrAAAAqwHUTZKrAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAOpQTFRF////5rgfICAg5LMbNTU15rciGBgYGBgY5rgf4bIYGBgYNDQ0yygo3zgoMzMzsyUl2jIj4KsZrxcXyCEUtRQUyCIT3qgXqBMThg0NCQkJ2qUTjQwMBgcHlQoKlwoK2qMSAAAAAQEBAgICBQUFCAgICAkJCwwMDg8PDw8PEhISEhMTFRYWGBkZGxwcHBwcHh8fICEhISIiJiYmKCkpLCwsLi4uMTExMjIyMzMzuQ0NwA4OwQ4OwxAQyBQUzBgY0B0d1CEh2J8S2SUl2ycn27AP27MP4roW5r4a57wd8sgp88kp9s8s99At+NEuUuKrwgAAACB0Uk5TADI4OTo8SVRkiIq8zMzP09Ps7/L19fX2+fr6+/39/f37ufb8AAAAoklEQVQYGa3BVRLCMAAFwIe7uweKQyF4oHhxuf91mNo0yCe7+Cur64sTgD04FZsC+ZD3wsfYbEh77VqZ8DJgihGltN+pV4gJTDWmqm5DIDowzWRANWKrShTw60LRuCGVzhWKkA37lWRazCGb1hIHMmcjmSDztkvJgMCbcCyhw/Pd/XTU4PnhcT6qcOXcVJeDApHdT1m4k7sfSh4AFscXG/7pBe0YTjKbUbRMAAAAAElFTkSuQmCC"
          alt=""
        />
      </Right>
    </Container>
  );
};

export default Announcement;
