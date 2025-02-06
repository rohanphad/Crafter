import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { base64toURL } from "../../utils/imgUtils";

const Intro2 = () => {
  const { portfolio, navigate } = useContext(AppContext);
  const sectionTemplate = portfolio.sections.find(
    (section) => section.name === "IntroTemp-2"
  );

  const { profilePic, name, shortDesc, longDesc, tagline } =
    sectionTemplate.details;
  const {
    primary_bg_color,
    secondary_bg_color, //#28292a
    tertiary_bg_color,
    primary_text_color,
    secondary_text_color,
  } = portfolio.theme;
  return (
    <div
      id="home"
      style={{
        width: "90%",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        className="profile"
        style={{
          width: "30%",
          backgroundColor: secondary_bg_color,
          borderRadius: "2rem",
          display: "flex",
          flexDirection: "column",
          padding: "2.5rem",
        }}
      >
        <div
          className="profile-pic"
          style={{
            width: "13rem",
            height: "13rem",
            borderRadius: "2rem",
            backgroundColor: primary_bg_color,
            margin: "0 auto 1rem auto",
            overflow: "hidden",
          }}
        >
          {profilePic && (
            <img
              src={base64toURL(profilePic)}
              alt="Profile"
              style={{
                maxWidth: "15rem",
                height: "13rem",
              }}
            />
          )}
        </div>
        <h3 style={{ fontWeight: "bold", color: primary_text_color }}>
          {name}
        </h3>
        <p style={{ fontSize: "1.2rem", color: secondary_text_color }}>
          {shortDesc}
        </p>
        <button
          style={{
            width: "60%",
            backgroundColor: tertiary_bg_color,
            color: primary_text_color,
            margin: "3rem auto 0 auto",
            fontWeight: "bold",
          }}
          onClick={() => navigate("#contact")}
        >
          Let's Talk
        </button>
      </div>
      <div
        className="about"
        style={{
          width: "70%",
          padding: "2.5rem 5rem",
        }}
      >
        <h1
          style={{
            color: primary_text_color,
            marginBottom: "2rem",
            fontSize: "4rem",
            textAlign: "left",
            fontWeight: "bolder",
          }}
        >
          {tagline}
        </h1>
        <h4 style={{ color: secondary_text_color, textAlign: "left" }}>
          {longDesc}
        </h4>
      </div>
    </div>
  );
};

export default Intro2;
