import React, { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";

const Projects = () => {
  const { portfolio } = useContext(AppContext);
  const sectionTemplate = portfolio.sections.find(
    (section) => section.name === "ProjectTemp-1"
  );
  const projects = sectionTemplate.details.list;
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
        style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2rem" }}
      >
        🚀 Projects
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
        }}
      >
        {projects.map((project, index) => (
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
              {project.name}
            </h3>
            <p style={{ color: secondary_text_color }}>{project.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
