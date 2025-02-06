import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/userServices";
const ProfileDropdown = () => {
  const { user } = useContext(AppContext);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            padding: "0",
          }}
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          {user.name}
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton1"
          style={{
            backgroundColor: "#13343b",
            color: "white",
            marginTop: 10,
            display: showProfileDropdown ? "block" : "none",
          }}
        >
          <li>
            <a
              className="dropdown-item"
              href="/profile"
              style={{ color: "white" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#20b8cd")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#13343b")}
            >
              Profile
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="/"
              onClick={async () => {
                await logout();
                setUser(null);
                navigate("/");
              }}
              style={{ color: "white" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#20b8cd")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#13343b")}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;
