import React, { useState } from "react";
import { base64toURL } from "../../utils/imgUtils";

const ImageInput = ({ label, value, onChange }) => {
  const [preview, setPreview] = useState(value);

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setPreview(reader.result);
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "1rem",
        padding: "1rem",
        backgroundColor: "#2a2a2a",
        borderRadius: "0.5rem",
        border: "1px solid #444444",
      }}
    >
      <label
        style={{
          fontSize: "0.9rem",
          color: "#aaa",
          marginBottom: "1rem",
        }}
      >
        {label}
      </label>
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#333",
          backgroundImage: `url(${base64toURL(preview) || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "1rem",
          border: "2px solid #444",
        }}
      >
        {!preview && (
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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e.target.files[0])}
        style={{
          display: "none",
        }}
        id="imageInput"
      />
      <label
        htmlFor="imageInput"
        style={{
          backgroundColor: "#444",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
      >
        Upload Picture
      </label>
    </div>
  );
};

export default ImageInput;
