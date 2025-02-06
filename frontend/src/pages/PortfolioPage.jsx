// import TestComp1 from "../components/TestComp1";
// import TestComp2 from "../components/TestComp2";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import { tempToComp } from "../config/tempToComp";
import { useParams } from "react-router-dom";
import { fetchPortfolioById } from "../services/portfolioServices";
const PortfolioPage = ({ mode = "preview" }) => {
  const { id } = mode === "preview" ? { id: null } : useParams();
  const [loading, setLoading] = useState(mode === "preview" ? null : true);
  const { portfolio, setPortfolio } = useContext(AppContext);
  useEffect(() => {
    const fetchPortfolio = async () => {
      const response = await fetchPortfolioById(id);
      setLoading(false);
      setPortfolio(response.data);
      console.log(response);
    };
    if (mode === "published") fetchPortfolio();
  }, []);
  //   console.log(portfolio);
  if (mode === "preview" && (!portfolio || portfolio?.sections?.length === 0)) {
    return (
      <div
        className="container-fluid no-scrollbar"
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          color: "black",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h5 style={{ opacity: "0.5" }}>Nothing To Show</h5>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div
          className="container-fluid no-scrollbar"
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            color: "black",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h5>Loading...</h5>
        </div>
      )}
      {!loading && (
        <div
          className="overflow-auto no-scrollbar"
          style={{
            backgroundColor: portfolio.theme.primary_bg_color,
            width: "100%",
            height: "100%",
            color: "black",
            textAlign: "center",
          }}
        >
          <div className="container">
            {portfolio?.sections?.map((section) => (
              <div className="row" key={section.name}>
                {tempToComp[section.name]()}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioPage;
