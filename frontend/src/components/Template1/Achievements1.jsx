import React, { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";

const Achievements = () => {
  const { portfolio } = useContext(AppContext);
  const sectionTemplate = portfolio.sections.find(
    (section) => section.name === "AchievTemp-1"
  );
  const achievements = sectionTemplate.details.list;
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
        style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}
      >
        🏆 Achievements
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
        }}
      >
        {achievements.map((achievement, index) => (
          <div
            key={index}
            style={{
              padding: "1.5rem",
              width: "300px",
              borderRadius: "10px",
              background: secondary_bg_color,
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ marginBottom: "0.5rem", color: primary_text_color }}>
              {achievement.name}
            </h3>
            <p style={{ color: secondary_text_color }}>{achievement.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
