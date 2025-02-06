import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { base64toURL } from "../../utils/imgUtils";

const Intro = () => {
  const { portfolio } = useContext(AppContext);
  const sectionTemplate = portfolio.sections.find(
    (section) => section.name === "IntroTemp-1"
  );

  const { profilePic, name, shortDesc, longDesc } = sectionTemplate.details;
  const {
    primary_bg_color,
    secondary_bg_color,
    tertiary_bg_color,
    primary_text_color,
    secondary_text_color,
  } = portfolio.theme;

  return (
    <div
      style={{
        padding: "3rem",
        textAlign: "center",
        background: `linear-gradient(135deg, ${primary_bg_color}, ${secondary_bg_color})`,
        color: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          objectFit: "cover",
          backgroundColor: "#333",
          border: `4px solid ${tertiary_bg_color}`,
          marginBottom: "1rem",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        {profilePic && (
          <img
            src={base64toURL(profilePic)}
            alt="Profile"
            style={{
              width: "160px",
              height: "160px",
            }}
          />
        )}
      </div>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: primary_text_color,
        }}
      >
        {name}
      </h1>
      <h3 style={{ color: secondary_text_color, marginBottom: "1rem" }}>
        {shortDesc}
      </h3>
      <p
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.6",
          color: primary_text_color,
        }}
      >
        {longDesc}
      </p>
    </div>
  );
};

export default Intro;
