import React, { useState } from "react";
import { UpdateIcon, DeleteIcon } from "../icons";

const SectionWrapper = ({
  title,
  templateName,
  onTemplateChange,
  onTemplateRemove,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = (e) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: "#333333",
        borderRadius: "0.5rem",
        padding: "1rem",
        width: "100%",
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={toggleSection}
      >
        <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{title}</span>
        <span style={{ fontSize: "1.2rem" }}>{isExpanded ? "▲" : "▼"}</span>
      </div>

      {isExpanded && (
        <div style={{ marginTop: "1rem" }}>
          {/* Template Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              padding: "0.75rem 1rem",
              backgroundColor: "#2a2a2a",
              borderRadius: "0.5rem",
              border: "1px solid #444444",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
              Template: {templateName || "Default"}
            </span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => onTemplateChange(title)}
                style={{
                  backgroundColor: "#20b8cd",
                  color: "#13343b",
                  border: "none",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  cursor: "pointer",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <UpdateIcon />
              </button>
              <button
                style={{
                  backgroundColor: "#fff",
                  color: "#13343b",
                  border: "none",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  cursor: "pointer",
                  width: "3rem",
                  height: "3rem",
                }}
                onClick={() => onTemplateRemove(templateName)}
                title="Remove Template"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>

          {/* Children */}
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default SectionWrapper;
