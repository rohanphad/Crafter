import { useContext, useEffect, useState } from "react";
import PortfolioPage from "./PortfolioPage";
import { AppContext } from "../context/AppContextProvider";
import AddSectoinPopUp from "../components/AddSectionPopUp";
import { DndContext, closestCenter } from "@dnd-kit/core";
import html2canvas from "html2canvas";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import DraggableItem from "../components/DraggableItem";
import {
  createPortfolio,
  updatePortfolio,
} from "../services/portfolioServices";
import Nav from "../components/Nav";

const CreatePage = () => {
  const { user, portfolio, setPortfolio, navigate } = useContext(AppContext);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sectionName, setSectionName] = useState("");

  useEffect(() => {
    console.log("create Page", user);
    if (!user) navigate("/login");
  }, []);

  const themeForm = [
    {
      label: "Primary Background Color",
      name: "primary_bg_color",
    },
    {
      label: "Secondary Background Color",
      name: "secondary_bg_color",
    },
    {
      label: "Tertiary Background Color",
      name: "tertiary_bg_color",
    },
    {
      label: "Primary Text Color",
      name: "primary_text_color",
    },
    {
      label: "Secondary Text Color",
      name: "secondary_text_color",
    },
  ];

  const addSection = () => {
    setSectionName("");
    setIsPopUpVisible(true);
  };

  const captureImg = async () => {
    const preview = document.querySelector(".portfolio-preview");
    const canvas = await html2canvas(preview);
    const base64Img = canvas.toDataURL("image/png");
    console.log("captureIMG", base64Img);
    return base64Img;
  };

  const handlePublish = async () => {
    const imgBase64 = await captureImg();

    const response = portfolio._id
      ? await updatePortfolio({ ...portfolio, img: imgBase64 })
      : await createPortfolio({ ...portfolio, img: imgBase64 });
    console.log(response.status);
    if (response.status === 201 || response.status === 200) {
      navigate("/my-portfolios");
    } else {
      alert("Portfolio Publish Failed, Try again");
    }
  };

  const onDragEnd = (event) => {
    setIsDragging(false);
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = portfolio.sections.findIndex(
        (s) => s.name === active.id
      );
      const newIndex = portfolio.sections.findIndex((s) => s.name === over.id);

      const updatedSections = arrayMove(portfolio.sections, oldIndex, newIndex);
      setPortfolio({ ...portfolio, sections: updatedSections });
    }
  };

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onTemplateChange = (section) => {
    setSectionName(section);
  };

  useEffect(() => {
    if (sectionName) {
      console.log(sectionName);
      setIsPopUpVisible(true);
    }
  }, [sectionName]);

  const onTemplateRemove = (templateName) => {
    setPortfolio((prev) => ({
      ...prev,
      sections: prev.sections.filter(
        (section) => section.name !== templateName
      ),
    }));
  };

  // ✅ Handle Theme Changes
  const handleThemeChange = (e) => {
    const { name, value } = e.target;
    setPortfolio((prev) => ({
      ...prev,
      theme: { ...prev.theme, [name]: value },
    }));
  };

  const navItems = [
    { name: "Home", href: "/", userRequired: false },
    { name: "My Portfolios", href: "/my-portfolios", userRequired: true },
    { name: "Templates", href: "/templates", userRequired: false },
    { name: "Contact", href: "#contact", userRequired: false },
  ];

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#191a1a",
        width: "100vw",
        height: "100vh",
        padding: "0",
        fontFamily: "Arial, sans-serif",
        color: "#ffffff",
      }}
    >
      {/* Popup Section */}
      {isPopUpVisible && (
        <div
          style={{
            position: "fixed",
            margin: "15vh 15vw",
            width: "70vw",
            height: "70vh",
            zIndex: "5",
            backgroundColor: "#191a1a",
            borderRadius: "1rem",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.5)",
          }}
        >
          <AddSectoinPopUp
            setIsPopUpVisible={setIsPopUpVisible}
            sectionName={sectionName}
          />
        </div>
      )}

      {/* Main Content */}

      <div className="row w-100 h-100 m-0 p-0 overflow-auto no-scrollbar">
        {/* Preview Section */}
        <div
          className="col-9 h-100 bg p-4"
          style={{
            backgroundColor: "#191a1a",
            color: "#000000",
            borderRight: "1px solid #444444",
            position: "relative",
          }}
        >
          <Nav layout="vertical" items={navItems} />
          <input
            type="text"
            value={portfolio.name}
            onChange={(e) =>
              setPortfolio({ ...portfolio, name: e.target.value })
            }
            style={{
              padding: "0 0.5rem ",
              border: "none",
              backgroundColor: "transparent",
              borderBottom: "1px solid #20b8cd",
              position: "absolute",
              top: "2rem",
              left: "10rem",
              zIndex: "1",
              outline: "none",
              color: "#888",
            }}
            onFocus={(e) => (e.target.style.color = "#fff")}
            onBlur={(e) => {
              e.target.style.color = "#888";
              setPortfolio({ ...portfolio, name: e.target.value });
            }}
          />
          <div style={{ position: "relative" }}>
            <h3
              style={{
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#20b8cd",
              }}
            >
              Preview
            </h3>
            <button
              style={{
                width: "8rem",
                padding: "0.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#20b8cd",
                color: "#13343b",
                transition: "background-color 0.3s",
                position: "absolute",
                right: "0",
                top: "-0.5rem",
              }}
              onMouseOver={(e) => {
                (e.target.style.backgroundColor = "#13343b"),
                  (e.target.style.color = "#fff");
              }}
              onMouseOut={(e) => {
                (e.target.style.backgroundColor = "#20b8cd"),
                  (e.target.style.color = "#13343b");
              }}
              onClick={handlePublish}
            >
              {portfolio._id ? "Update" : "Publish"}
            </button>
          </div>
          <div
            className="portfolio-preview overflow-auto no-scrollbar"
            style={{
              height: "90%",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              backgroundColor: "#13343b",
              boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <PortfolioPage mode="preview" />
          </div>
        </div>

        {/* Sidebar Section */}
        <div
          className="col-3 h-100 text-white p-0 overflow-auto no-scrollbar"
          style={{
            backgroundColor: "#191a1a",
            padding: "1rem",
          }}
        >
          {/* Add Components Header */}
          <div
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "transparent",
              textAlign: "center",
            }}
          >
            <h4 style={{ fontWeight: "bold", color: "#20b8cd" }}>
              Edit Your Portfolio
            </h4>
          </div>

          {/* Add Section Button */}
          <button
            className="m-4"
            style={{
              width: "calc(100% - 4rem)",
              padding: "0.75rem",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#20b8cd",
              color: "#13343b",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              (e.target.style.backgroundColor = "#13343b"),
                (e.target.style.color = "#fff");
            }}
            onMouseOut={(e) => {
              (e.target.style.backgroundColor = "#20b8cd"),
                (e.target.style.color = "#13343b");
            }}
            onClick={addSection}
          >
            Select Templates
          </button>

          {/* ✅ Theme Customization Form */}
          {portfolio?.theme && (
            <>
              <div
                style={{
                  backgroundColor: "#333333",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  margin: "1rem",
                }}
              >
                <h4 style={{ marginBottom: "1rem" }}>Theme Settings</h4>
                {themeForm.map((item) => (
                  <div style={{ marginBottom: "1rem" }} key={item.label}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "#aaa",
                      }}
                    >
                      {item.label}
                    </label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <input
                        type="text"
                        name={item.name}
                        value={portfolio.theme[item.name]}
                        onChange={handleThemeChange}
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "5px",
                          border: "1px solid #444",
                          backgroundColor: "#222",
                          color: "#aaa",
                        }}
                      />
                      <input
                        type="color"
                        name={item.name}
                        value={portfolio.theme[item.name]}
                        onChange={handleThemeChange}
                        style={{
                          width: "40px",
                          height: "40px",
                          border: "none",
                          cursor: "pointer",
                          background: "none",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Section List */}
          {portfolio.sections && (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
              onDragStart={onDragStart}
            >
              <SortableContext
                items={portfolio.sections.map((s) => s.name)}
                strategy={verticalListSortingStrategy}
              >
                {portfolio.sections.map((section) => (
                  <DraggableItem
                    key={section.name}
                    section={section}
                    isDragging={isDragging}
                    onTemplateChange={onTemplateChange}
                    onTemplateRemove={onTemplateRemove}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
