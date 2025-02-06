import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import PortfolioPage from "./pages/PortfolioPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPortfoliosPage from "./pages/MyPortfoliosPage";

function App() {
  return (
    <div
      className="App no-scrollbar"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-portfolios" element={<MyPortfoliosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/createpage" element={<CreatePage />} />
        <Route
          path="/portfolio/:id"
          element={<PortfolioPage mode="published" />}
        />
      </Routes>
    </div>
  );
}

export default App;
