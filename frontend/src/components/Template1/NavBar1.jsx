import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";

const NavBar1 = () => {
  const { portfolio } = useContext(AppContext);
  const primaryBgColor = portfolio.theme.primary_bg_color;
  const primaryTextColor = portfolio.theme.primary_text_color;
  return (
    <>
      <div
        style={{
          backgroundColor: primaryBgColor,
          width: "100%",
          height: "40px",
        }}
      >
        <ul
          style={{
            color: primaryTextColor,
            listStyleType: "none",
            display: "flex",
          }}
        >
          <li>About Me</li>
          <li>Projects</li>
          <li>Skills</li>
          <li>Achievements</li>
          <li>Contact</li>
        </ul>
      </div>
    </>
  );
};

export default NavBar1;
