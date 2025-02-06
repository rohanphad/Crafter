import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { DeleteIcon, RedirectIcon, UpdateIcon } from "../components/icons";
import {
  fetchPortfolios,
  deletePortfolio,
} from "../services/portfolioServices";
import defaultPortfolio from "../config/defaultPortfolio";

const MyPortfoliosPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const { user, setPortfolio } = useContext(AppContext);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [searchPortfolioName, setSearchPortfolioName] = useState("");

  const fetchPortfoliosData = async () => {
    const responseData = await fetchPortfolios();
    setPortfolios(responseData);
    setList(responseData);
  };

  useEffect(() => {
    fetchPortfoliosData();
  }, []);

  const navItems = [
    { name: "Home", href: "/", userRequired: false },
    { name: "My Portfolios", href: "/my-portfolios", userRequired: true },
    { name: "New Portfolio", href: "/createPage", userRequired: false },
  ];

  if (!user) {
    navigate("/login");
  }
  // console.log(portfolios);
  console.log(list);

  const searchPortfolio = () => {
    setList((prev) => prev.filter((item) => item.name === searchPortfolioName));
  };

  const handleCreateNew = async () => {
    setPortfolio(defaultPortfolio);
    navigate("/createpage");
  };

  const handleDelete = async (portfolioId) => {
    console.log(portfolioId);
    await deletePortfolio(portfolioId);
    fetchPortfoliosData();
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#191a1a",
        color: "#fff",
        minHeight: "100vh",
        padding: "0",
      }}
    >
      <Nav items={navItems} />
      <header
        style={{
          textAlign: "center",
          padding: "10px 0",
          backgroundColor: "#13343b",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ fontSize: "24px", color: "#20b8cd" }}>My Portfolios</h1>
      </header>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
            gap: "10px",
          }}
        >
          <button
            onClick={handleCreateNew}
            style={{
              backgroundColor: "#20b8cd",
              color: "#13343b",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              width: "200px",
              margin: "0 auto",
            }}
          >
            Create New
          </button>
          <div style={{ width: "100%", padding: "0" }}>
            <input
              type="text"
              placeholder="Enter portfolio name"
              value={searchPortfolioName}
              onChange={(e) => setSearchPortfolioName(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                width: "80%",
                borderRadius: "5px",
                border: "1px solid #13343b",
              }}
            />
            <button
              onClick={searchPortfolio}
              style={{
                backgroundColor: "#20b8cd",
                color: "#13343b",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          listStyle: "none",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          flexWrap: "wrap",
          gap: "5rem",
          padding: "5rem",
        }}
      >
        {list.map((portfolio) => (
          <div
            key={portfolio._id}
            style={{
              padding: "10px 15px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#333333",
              borderRadius: "1rem",
              position: "relative",
            }}
          >
            <button
              style={{
                backgroundColor: "#fff",
                color: "#13343b",
                border: "none",
                borderRadius: "1rem",
                cursor: "pointer",
                width: "2rem",
                height: "2rem",
                padding: "0",
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
              }}
              onClick={() => navigate(`/portfolio/${portfolio._id}`)}
            >
              <RedirectIcon />
            </button>
            <div
              style={{
                width: "15rem",
                height: "10rem",
                backgroundColor: "#222",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
            >
              {portfolio.img && (
                <img
                  src={portfolio.img}
                  alt="image"
                  style={{ maxWidth: "15rem" }}
                ></img>
              )}
            </div>
            <div
              style={{
                textAlign: "left",
                float: "left",
                marginTop: "1rem",
              }}
            >
              <span style={{ display: "block", textAlign: "left" }}>
                {portfolio.name}
              </span>
              <p style={{ color: "#999" }}>{portfolio.description}</p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{
                  backgroundColor: "#20b8cd",
                  color: "#13343b",
                  border: "none",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  width: "2rem",
                  height: "2rem",
                  padding: "0",
                }}
                onClick={() => {
                  setPortfolio(portfolio);
                  navigate("/createpage");
                }}
              >
                <UpdateIcon />
              </button>
              <button
                style={{
                  backgroundColor: "#fff",
                  color: "#13343b",
                  border: "none",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  width: "2rem",
                  height: "2rem",
                  padding: "0",
                }}
                onClick={() => handleDelete(portfolio._id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
        {portfolios.length === 0 && (
          <div
            style={{
              padding: "10px 15px",
              textAlign: "center",
              color: "#aaa",
            }}
          >
            No portfolios found. Create one!
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPortfoliosPage;
