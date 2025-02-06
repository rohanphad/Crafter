import React, { useState, useContext } from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import ListInput from "./ListInput";
import { SaveIcon, UpdateIcon } from "../icons";
import { AppContext } from "../../context/AppContextProvider";

const DynamicForm = ({ sectionName, fields }) => {
  const { portfolio, setPortfolio } = useContext(AppContext);
  const [formData, setFormData] = useState(() => {
    const section = portfolio.sections.find(
      (section) => section.name === sectionName
    );
    return section.details;
  });
  const [editMode, setEditMode] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = false;
      return acc;
    }, {})
  );

  const onChange = (fieldName, value) => {
    setPortfolio((prev) => {
      const newPortfolio = { ...prev };
      newPortfolio.sections.forEach((section) => {
        if (section.name === sectionName) {
          section.details[fieldName] = value;
        }
      });
      return newPortfolio;
    });
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const toggleEditMode = (fieldName) => {
    setEditMode((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <div>
      {fields.map((field) => {
        if (field.type === "text" || field.type === "textArea") {
          return (
            <div
              key={field.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
                padding: "1rem",
                backgroundColor: "#2a2a2a",
                borderRadius: "0.5rem",
                border: "1px solid #444444",
              }}
            >
              <div style={{ flex: 1, marginRight: "1rem" }}>
                <TextInput
                  type={field.type}
                  label={field.label}
                  value={formData[field.name]}
                  onChange={(value) => {
                    onChange(field.name, value);
                  }}
                  disabled={!editMode[field.name]}
                />
              </div>
              <button
                onClick={() => toggleEditMode(field.name)}
                style={{
                  backgroundColor: editMode[field.name] ? "#fff" : "#20b8cd",
                  color: "#13343b",
                  border: "none",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  cursor: "pointer",
                  width: "3rem",
                  height: "3rem",
                }}
                title={editMode[field.name] ? "Save" : "Edit"}
              >
                {editMode[field.name] ? <SaveIcon /> : <UpdateIcon />}
              </button>
            </div>
          );
        } else if (field.type === "image") {
          return (
            <ImageInput
              key={field.name}
              label={field.label}
              value={formData[field.name]}
              onChange={(value) => {
                onChange(field.name, value);
              }}
            />
          );
        } else if (field.type === "list") {
          return (
            <ListInput
              sectionName={sectionName}
              itemTemplate={field.itemTemplate}
              onChange={(value) => {
                onChange(field.name, value);
              }}
            ></ListInput>
          );
        }
        return null;
      })}
    </div>
  );
};

export default DynamicForm;
