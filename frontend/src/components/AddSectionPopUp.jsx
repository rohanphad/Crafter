import { useContext, useEffect, useState } from "react";
import TemplateGrid from "./TemplateGrid";
import {
  achievTemplates,
  contactTemplates,
  introTemplates,
  navTemplates,
  projectTemplates,
  skillsTemplates,
} from "../config/templates";
import { AppContext } from "../context/AppContextProvider";

const AddSectoinPopUp = ({ setIsPopUpVisible, sectionName }) => {
  const [selectedSection, setSelectedSection] = useState(sectionName);
  const { portfolio, setPortfolio } = useContext(AppContext);
  const [templates, setTemplates] = useState([]);
  const [addedSection, setAddedSection] = useState(portfolio.sections);
  const sectionToTemps = {
    NavBar: navTemplates,
    Intro: introTemplates,
    Projects: projectTemplates,
    Skills: skillsTemplates,
    Achievments: achievTemplates,
    Contact: contactTemplates,
  };
  console.log(sectionName);
  //   console.log(sectionToTemps["NavBar"]);
  const handleCancel = () => {
    setIsPopUpVisible(false);
  };
  const handleSubmit = () => {
    setPortfolio((prev) => ({
      ...prev,
      sections: addedSection,
    }));
    setIsPopUpVisible(false);
  };

  const handleRemove = (type) => {
    setAddedSection((prev) => prev.filter((section) => section.type !== type));
  };

  useEffect(() => {
    // console.log(selectedSection);
    selectedSection !== "" && setTemplates(sectionToTemps[selectedSection]);
  }, [selectedSection]);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setSelectedSection(event.target.value);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#222222",
        borderRadius: "1rem",
        position: "relative",
        display: "flex",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "2rem",
        }}
      >
        <div style={{ width: "70%", borderRight: "1px solid #999999" }}>
          <div>
            <label htmlFor="options" style={{ marginRight: "1rem" }}>
              Add Section:
            </label>
            <select
              id="options"
              value={selectedSection}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Section
              </option>
              <option value="NavBar">NavBar</option>
              <option value="Intro">Intro</option>
              <option value="Projects">Projects</option>
              <option value="Skills">Skills</option>
              <option value="Achievments">Achievments</option>
              <option value="Contact">Contact</option>
            </select>
          </div>
          <div style={{ width: "100%", padding: "1rem", textAlign: "left" }}>
            <h6>Templates</h6>
          </div>
          <div
            className="no-scrollbar"
            style={{
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "65%",
              overflow: "auto",
              position: "relative",
            }}
          >
            {selectedSection === "" ? (
              <p style={{ opacity: "0.5" }}>Please select a section</p>
            ) : (
              <TemplateGrid
                templates={templates}
                setAddedSection={setAddedSection}
                addedSection={addedSection}
                selectedSection={selectedSection}
              ></TemplateGrid>
            )}
          </div>
        </div>
        <div style={{ width: "30%", color: "white", padding: "1rem" }}>
          <h6 style={{ marginBottom: "1rem" }}>Added Sections</h6>
          {addedSection.map((section) => (
            <div
              key={section.type}
              style={{
                backgroundColor: "#333333",
                margin: "10px 0 0 0",
                borderRadius: "0.2rem",
                padding: "0.25rem",
              }}
            >
              <p
                style={{
                  textAlign: "left",
                  margin: "0 0 0 1rem",
                }}
              >
                {section.name}
                <button
                  style={{
                    borderRadius: "0.2rem",
                    backgroundColor: "white",
                    color: "#222222",
                    padding: "0 0.5rem",
                    float: "right",
                  }}
                  onClick={() => handleRemove(section.type)}
                >
                  X
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <button style={{}} onClick={handleCancel}>
          Cancel
        </button>
        <button
          style={{ backgroundColor: "#20b8cd", color: "black" }}
          onClick={handleSubmit}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default AddSectoinPopUp;
