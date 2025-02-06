import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";

const Icon = ({ children }) => {
  const { portfolio } = useContext(AppContext);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 570 512"
      style={{
        width: "70%",
        height: "70%",
        fill: portfolio.theme.primary_text_color,
      }}
    >
      {children}
    </svg>
  );
};

export default Icon;
