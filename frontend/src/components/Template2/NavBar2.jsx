import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import {
  ContactIcon,
  HomeIcon,
  ProjectIcon,
  SkillIcon,
  WorkExIcon,
} from "../icons";

const NavBar2 = () => {
  const { portfolio, navigate } = useContext(AppContext);
  const {
    primary_bg_color,
    secondary_bg_color, //#28292a
    tertiary_bg_color,
    primary_text_color,
    secondary_text_color,
  } = portfolio.theme;

  const onMouseOver = (e) => {
    e.target.style.backgroundColor = tertiary_bg_color;
  };
  const onMouseOut = (e) => {
    e.target.style.backgroundColor = secondary_bg_color;
  };

  const listStyle = {
    width: "2rem",
    height: "2rem",
    borderRadius: "0.5rem",
    margin: 0,
    alignContent: "center",
    justifyContent: "center",
  };

  return (
    <div
      className="navbar2"
      style={{
        backgroundColor: secondary_bg_color,
        width: "40%",
        margin: "1rem auto",
        borderRadius: "1rem",
        padding: "0.25rem",
      }}
    >
      <ul
        className="nav-list"
        style={{
          display: "flex",
          justifyContent: "space-around",
          color: primary_text_color,
          margin: "0",
          padding: "0.25rem",
        }}
      >
        <li style={listStyle} onClick={() => navigate("#home")}>
          <HomeIcon />
        </li>
        <li style={listStyle} onClick={() => navigate("#projects")}>
          <ProjectIcon />
        </li>
        <li style={listStyle} onClick={() => navigate("#skills")}>
          <SkillIcon />
        </li>
        <li style={listStyle} onClick={() => navigate("#work")}>
          <WorkExIcon />
        </li>
        <li style={listStyle} onClick={() => navigate("#contact")}>
          <ContactIcon />
        </li>
      </ul>

      <style>
        {`
            

            li:hover {
              background-color: ${tertiary_bg_color};
              cursor: pointer;
            }
            
            `}
      </style>
    </div>
  );
};

export default NavBar2;
