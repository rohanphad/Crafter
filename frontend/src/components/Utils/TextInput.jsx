import React from "react";

const TextInput = ({ label, value, type, onChange, disabled }) => {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#2a2a2a",
        borderRadius: "0.5rem",
      }}
    >
      <label
        style={{
          fontSize: "0.9rem",
          color: "#aaa",
          display: "block",
          marginBottom: "0.2rem",
        }}
      >
        {label}
      </label>
      {type === "textArea" ? (
        <textarea
          className="no-scrollbar"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "100%",
            height: "100px",
            borderRadius: "0.25rem",
            border: "1px solid #444444",
            backgroundColor: "#333333",
            color: "#ffffff",
            cursor: "text",
            resize: "none", // Prevents resizing if needed
          }}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "100%",
            borderRadius: "0.25rem",
            border: "1px solid #444444",
            backgroundColor: "#333333",
            color: "#ffffff",
          }}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default TextInput;
