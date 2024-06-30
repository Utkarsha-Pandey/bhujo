import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/signin");
  };

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="navbar-brand">
              Welcome to Dashboard
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {loginUser && (
                <>
                  <li className="nav-item">
                  <span className="nav-link">
                    <a className="nav-link" href="/dashboard">
                      Dashboard
                    </a>
                  </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">
                    <a className="nav-link" href={`/profile/${loginUser._id}`}>
                        {loginUser.name}
                      </a>
                    </span>
                  </li>
                </>
              )}
              <li className="nav-item">
              <span className="nav-link">
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export function ProtectedItems(props) {
  if (localStorage.getItem("user")) {
    return <Username />;
  } else {
    return <ShowButton />;
  }
}

function Username(props) {
  // This function currently doesn't do anything, it can be implemented as needed
  return null;
}

function ShowButton(props) {
  // This function currently doesn't do anything, it can be implemented as needed
  return null;
}

export default Header;
