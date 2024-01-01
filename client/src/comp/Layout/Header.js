import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
      return
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/signin");
  };
  return (
    <>
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
            <span className="navbar-toggler-icon " />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="navbar-brand" to="/">
              Welcome to Dashboard
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {" "}
                <p className="nav-link">{loginUser && loginUser.name}</p>{" "}
              </li>
              <li className="nav-item">
                <button className="btn btn-primary"
                  onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <header className="site-header">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-12 col-12 d-flex align-items-center">
                <a
                  className="site-header-text d-flex justify-content-space-evenly align-items-center me-0"
                  href="/"
                >
                  <i>
                    <img
                      src="images/pyramids(1).png"
                      width="35px"
                      height="35px"
                      alt="rerc"
                    />
                  </i>
                  <span>Thoth's Stellar Ledger</span>
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav d-flex justify-content-space-evenly align-items-center ms-lg-auto">
                    <li className="nav-item">
                      <a href="index.html" className="custom-btn-new">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="about.html" className="custom-btn-new">
                        About Us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="features.html" className="custom-btn-new">
                        Features
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="contact.html" className="custom-btn-new">
                        Contact Us
                      </a>
                    </li>
                    <ProtectedItems>

                    <li>
                      <div>
                        
                        <a
                          href="/signin"
                          className="custom-btn nav-item custom-border-btn btn"
                        >
                          Login/SignUp
                        </a>
                        

                      </div>
                    </li>

                    </ProtectedItems>


                    <li className="nav-item">
                      Welcome {loginUser && loginUser.name}
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-primary" onClick={logoutHandler}>
                        Logout
                      </button>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header> */}
      </header>
    </>
  );
};

function Username(props) {


}

function ShowButton(props) {
  <>

  </>
}




export function ProtectedItems(props) {
  if (localStorage.getItem("user")) {
    return <Username />;
  } else {

    return <ShowButton />;

  }
}
export default Header;
