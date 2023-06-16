import { useState } from "react";
import "./tabs.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
function Tabs({ benefit_desc, item_desc, technical_infos ,shipping_info}) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  /////////////////decodeHTMLEntities////////////////////////////
  var element = document.createElement("div");
  function decodeHTMLEntities(str) {
    if (str && typeof str === "string") {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = "";
    }

    return str;
  }
  //////////////////////////////////////////////////////////////
  return (
    <div className="tabContainer">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <AddCircleOutlineIcon style={{ marginRight: "5px" }} />
          Produktvorteile
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <DriveFileRenameOutlineIcon style={{ marginRight: "5px" }} />
          Artikelbeschreibung
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          <SettingsIcon style={{ marginRight: "5px" }} />
          Technische Daten
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          <LocalShippingIcon style={{ marginRight: "5px" }} />
          Versandinformation
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: decodeHTMLEntities(benefit_desc),
            }}
          ></div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: decodeHTMLEntities(item_desc),
            }}
          ></div>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          {technical_infos &&
            technical_infos.map((tech) => {
              return (
                <>
                  <div key={tech.id}
                    dangerouslySetInnerHTML={{
                      __html: decodeHTMLEntities(tech.description),
                    }}
                  ></div>
                </>
              );
            })}
        </div>
        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
           <div
            dangerouslySetInnerHTML={{
              __html: decodeHTMLEntities(shipping_info.description),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
