import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SectionWrapper, DynamicForm } from "../components/Utils";
import formFields from "../config/formFields";

const DraggableItem = ({
  section,
  isDragging,
  onTemplateChange,
  onTemplateRemove,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.name });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: "#333",
        color: "#fff",
        marginBottom: "0.5rem",
        borderRadius: "8px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #444",
        userSelect: "none",
        position: "relative",
      }}
    >
      <div
        {...attributes}
        {...listeners}
        style={{
          position: "absolute",
          left: "0.5rem",
          top: "0.5rem",
          cursor: "grab",
          padding: "0.5rem",
        }}
      >
        ☰ {/* Drag Handle Icon */}
      </div>
      <div style={{ width: "100%", marginLeft: "1.5rem" }}>
        <SectionWrapper
          key={section.type}
          title={section.type}
          templateName={section.name}
          isDragging={isDragging}
          onTemplateChange={onTemplateChange}
          onTemplateRemove={onTemplateRemove}
        >
          <DynamicForm
            fields={formFields[section.name]}
            sectionName={section.name}
          />
        </SectionWrapper>
      </div>
    </div>
  );
};

export default DraggableItem;
