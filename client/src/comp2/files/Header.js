import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {

    useEffect(() => {
      // const[loginUser,setLoginUser] = useState('')
      
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
          setLoginUser(user)
        }
      
    })
    const [loginUser, setLoginUser] = useState("");
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
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
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
            <a className="navbar-brand" href="#">
              Expense Manager
            </a>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <p className="nav-link">{loginUser && loginUser.name}</p>{" "}
              </li>
              <li> <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
