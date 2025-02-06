import { useState } from "react";
import { UpdateIcon, SaveIcon } from "../icons";

const IntroForm = () => {
  const [fields, setFields] = useState({
    profilePicture: "",
    name: "John Doe",
    shortDescription: "A short description goes here.",
    longDescription: "A long description goes here.",
  });

  const [editMode, setEditMode] = useState({
    name: false,
    shortDescription: false,
    longDescription: false,
  });

  const handleFieldChange = (field, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const toggleEditMode = (field) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: !prevEditMode[field],
    }));
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFields((prevFields) => ({
        ...prevFields,
        profilePicture: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div
      style={{
        padding: "1.5rem",
        backgroundColor: "#1e1e1e",
        borderRadius: "1rem",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Profile Picture Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#333",
            backgroundImage: `url(${fields.profilePicture || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginBottom: "1rem",
            border: "2px solid #444",
          }}
        >
          {!fields.profilePicture && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#aaa",
                fontSize: "0.8rem",
              }}
            >
              No Image
            </span>
          )}
        </div>
        <label
          htmlFor="profilePicture"
          style={{
            backgroundColor: "#111111",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Upload Picture
        </label>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Other Fields */}
      {Object.entries(fields)
        .filter(([key]) => key !== "profilePicture")
        .map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#2a2a2a",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ flex: 1, marginRight: "1rem" }}>
              <label
                style={{
                  fontSize: "0.9rem",
                  color: "#aaa",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                {key === "name"
                  ? "Name"
                  : key === "shortDescription"
                  ? "Short Description"
                  : "Long Description"}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                disabled={!editMode[key]}
                style={{
                  padding: "0.5rem",
                  width: "100%",
                  borderRadius: "0.25rem",
                  border: editMode[key] ? "1px solid #fff" : "1px solid #444",
                  backgroundColor: editMode[key] ? "#333" : "#2a2a2a",
                  color: "#fff",
                  cursor: editMode[key] ? "text" : "default",
                }}
              />
            </div>
            <button
              onClick={() => toggleEditMode(key)}
              style={{
                backgroundColor: "#111111",
                color: "#ffffff",
                border: "none",
                padding: "0.5rem",
                borderRadius: "50%",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              title={editMode[key] ? "Save" : "Edit"}
            >
              {editMode[key] ? <SaveIcon /> : <UpdateIcon />}
            </button>
          </div>
        ))}
    </div>
  );
};

export default IntroForm;
