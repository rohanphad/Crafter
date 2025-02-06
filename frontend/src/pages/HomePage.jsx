import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import Nav from "../components/Nav";

const Homepage = () => {
  const { user, setUser } = useContext(AppContext);
  console.log(user);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/", userRequired: false },
    { name: "My Portfolios", href: "/my-portfolios", userRequired: true },
  ];
  return (
    <div
      className="text-white flex-grow-1 d-flex flex-column no-scrollbar"
      style={{ backgroundColor: "#191a1a" }}
    >
      <Nav items={navItems} />
      <div className="container flex-grow-1 d-flex align-items-center">
        <div
          className="row w-100 "
          style={{ height: "100vh", padding: "12rem" }}
        >
          <h1
            className="fw-bold display-5 mb-5"
            style={{ fontWeight: "bolder", fontSize: "5rem" }}
          >
            Build <span style={{ color: "#20b8cd" }}> Stunning</span> Portfolios
            with <span style={{ color: "#20b8cd" }}> Ease</span>
          </h1>

          <div>
            <button
              className="btn btn-light btn-lg me-3"
              style={{
                backgroundColor: "#20b8cd",
                border: "none",
                color: "#191a1a",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#13343b")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#20b8cd")}
              onClick={() => navigate("/createPage")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      {/* <div
        className="container flex-grow-1 d-flex flex-column align-items-center"
        id="features"
        style={{ marginBottom: "2rem" }}
      >
        <h1 style={{ marginBottom: "2rem" }}>Features</h1>
        <div
          className="row w-100 d-flex"
          style={{ justifyContent: "space-between", marginBottom: "3rem" }}
        >
          <div
            className="col-md-3 d-flex flex-column justify-content-center"
            style={{ backgroundColor: "white", height: "18rem" }}
          ></div>
          <div
            className="col-md-3 d-flex flex-column justify-content-center"
            style={{ backgroundColor: "white", height: "18rem" }}
          ></div>
          <div
            className="col-md-3 d-flex flex-column justify-content-center"
            style={{ backgroundColor: "white", height: "18rem" }}
          ></div>
        </div>
        <div
          className="row w-100 d-flex"
          style={{ justifyContent: "space-between" }}
        >
          <div
            className="col-md-3 d-flex flex-column justify-content-center"
            style={{ backgroundColor: "white", height: "18rem" }}
          ></div>
          <div
            className="col-md-3 d-flex flex-column justify-content-center"
            style={{ backgroundColor: "white", height: "18rem" }}
          ></div>
          <div
            className="col-md-3 d-flex flex-column justify-content-center"
            style={{ backgroundColor: "white", height: "18rem" }}
          ></div>
        </div>
      </div> */}
    </div>
  );
};

export default Homepage;
