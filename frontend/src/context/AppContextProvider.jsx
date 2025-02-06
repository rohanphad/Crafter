import { useState, createContext, useEffect } from "react";
import defaultPortfolio from "../config/defaultPortfolio";
import { useNavigate } from "react-router-dom";
// import {
//   Intro1,
//   Projects1,
//   Skills1,
//   Achievements1,
//   Contact1,
// } from "../components/Template1";
// import NavBar1 from "../components/Template1/NavBar1";
// import configs from "../config/temp1";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  //   console.log(NavBar1);
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <AppContext.Provider
      value={{ portfolio, setPortfolio, user, setUser, navigate }}
    >
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
};
