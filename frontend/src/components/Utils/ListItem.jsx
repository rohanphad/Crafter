import React, { useContext, useState } from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import { SaveIcon, UpdateIcon } from "../icons";
import { AppContext } from "../../context/AppContextProvider";

const ListItem = ({ index, sectionName, fields, onChange, onRemove }) => {
  const { portfolio } = useContext(AppContext);
  //   console.log(template);
  //   console.log(index);
  const section = portfolio.sections.find(
    (section) => section.name === sectionName
  );
  const [editMode, setEditMode] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = false;
      return acc;
    }, {})
  );

  const toggleEditMode = (fieldName) => {
    setEditMode((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <div
      style={{
        marginBottom: "1rem",
        padding: "1rem",
        backgroundColor: "#2a2a2a",
        borderRadius: "0.5rem",
        border: "1px solid #444", // Added border
      }}
    >
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
              }}
            >
              <div style={{ flex: 1, marginRight: "1rem" }}>
                <TextInput
                  label={field.label}
                  value={section.details.list[index][field.name]}
                  disabled={!editMode[field.name]}
                  onChange={(value) => onChange(field.name, value)}
                />
              </div>
              <button
                onClick={() => toggleEditMode(field.name)}
                style={{
                  backgroundColor: "#111111",
                  color: "#ffffff",
                  border: "none",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  cursor: "pointer",
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
              value={field.value}
              onChange={(value) => onChange(field.name, value)}
            />
          );
        }
        return null;
      })}

      {/* Remove Item Button */}
      <div style={{ textAlign: "right" }}>
        <button
          onClick={onRemove}
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ListItem;
