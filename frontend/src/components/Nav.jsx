import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./profileDropdown";
import axios from "axios";

const Nav = ({ items, layout = "horizontal" }) => {
  const { user, setUser, navigate } = useContext(AppContext);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // For vertical layout toggle

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/fetchUser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      {layout === "horizontal" ? (
        // ✅ Horizontal Navbar Layout
        <nav className="navbar navbar-expand-lg navbar-dark px-4 w-100">
          <a className="navbar-brand fw-bold" href="/">
            Crafter
          </a>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              {items.map(
                (item, index) =>
                  ((item.userRequired && user) || !item.userRequired) && (
                    <li className="nav-item" key={index}>
                      <a className="nav-link" href={item.href}>
                        {item.name}
                      </a>
                    </li>
                  )
              )}
            </ul>

            {!user ? (
              <>
                <button
                  className="btn btn-outline-light mx-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-light"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div
                className="profile-section"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <div className="profile-icon">{user.name[0]}</div>
                <ProfileDropdown />
              </div>
            )}
          </div>
        </nav>
      ) : (
        // ✅ Vertical Sidebar Layout
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            ✖
          </button>

          <ul>
            {items.map(
              (item, index) =>
                ((item.userRequired && user) || !item.userRequired) && (
                  <li key={index}>
                    <a href={item.href} onClick={() => navigate(item.href)}>
                      {item.name}
                    </a>
                  </li>
                )
            )}
          </ul>

          {!user ? (
            <>
              <button
                className="btn btn-outline-light mx-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-light"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <div
              className="profile-section"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="profile-icon">{user.name[0]}</div>
              <ProfileDropdown />
            </div>
          )}
        </div>
      )}

      {/* Sidebar Toggle Button (Only for Vertical Layout) */}
      {layout === "vertical" && (
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
      )}

      {/* Styles */}
      <style>
        {`
          /* Horizontal Navbar Styles */
          .navbar {
            background-color: #191a1a;
            position: sticky;
            top: 0;
            z-index: 1000;
          }

          .navbar .profile-section {
            display: flex;
            align-items: center;
            cursor: pointer;
          }

          .profile-icon {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background-color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            margin-right: 0.5rem;
          }

          /* Vertical Sidebar Styles */
          .sidebar {
            position: fixed;
            top: 0;
            left: -250px;
            width: 250px;
            height: 100vh;
            background-color: #191a1a;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
            transition: left 0.3s ease-in-out;
            padding-top: 20px;
            z-index: 1000;
          }

          .sidebar.open {
            left: 0;
          }

          .sidebar ul {
            list-style: none;
            padding: 0;
            text-align: center;
            display: flex;
            flex-direction: column;
            margin-top: 4rem
          }

          .sidebar ul li {
            padding: 15px;
          }

          .sidebar ul li a {
            color: white;
            text-decoration: none;
            font-size: 18px;
          }

          .menu-btn {
            background: none;
            border: none;
            font-size: 20px;
            color: white;
            cursor: pointer;
            margin: 10px;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            display: ${isSidebarOpen ? "none" : "block"};
          }

          .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 18px;
            color: white;
            cursor: pointer;
          }

          .profile-section{
            display: flex;
            cursor: pointer;
            ${layout === "vertical" ? "justify-content: center;" : ""};
            
          }
        `}
      </style>
    </>
  );
};

export default Nav;
