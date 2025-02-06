import React, { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";

const Skills = () => {
  const { portfolio } = useContext(AppContext);
  const sectionTemplate = portfolio.sections.find(
    (section) => section.name === "SkillsTemp-1"
  );
  const skills = sectionTemplate.details.list;
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
        backgroundColor: primary_bg_color,
        color: primary_text_color,
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "1.5rem",
        }}
      >
        💡 Skills
      </h2>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {skills.map((skill, index) => (
          <span
            key={index}
            style={{
              padding: "0.75rem 1.5rem",
              background: secondary_bg_color,
              borderRadius: "50px",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "uppercase",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
