import React, { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";

const Contact = () => {
  const { portfolio } = useContext(AppContext);
  const sectionTemplate = portfolio.sections.find(
    (section) => section.name === "ContactTemp-1"
  );
  const { contactNum } = sectionTemplate.details;
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
        padding: "2rem",
        backgroundColor: primary_bg_color,
        color: primary_text_color,
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "1.8rem" }}>📞 Contact</h2>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        Phone: {contactNum}
      </p>
    </div>
  );
};

export default Contact;
