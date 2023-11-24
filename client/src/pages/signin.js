import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../comp/Spinner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/signin", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>

      <main>
        <header className="site-header">
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
                    </ul>
                    <div>
                      <a
                        href="login.html"
                        className="custom-btn nav-item custom-border-btn btn"
                      >
                        Login/SignUp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <section className="hero-section hero-bg d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-12 mx-auto">
                {loading && <Spinner/>}
                
                <Form className="custom-form login-form" layout="vertical" onFinish={submitHandler}>
                  <h2 className="hero-title text-center mb-4 pb-2">Login Form</h2>
                  <div className="form-floating mb-4 p-0">
                  <Form.Item className="form-floating mb-4 p-0" name="email" >
                    <Input type="email" className="form-control" placeholder="Email Address" />
                  </Form.Item>
                  </div>

                  <div className="form-floating p-0">
                  <Form.Item name="password">
                    <Input type="password" className="form-control" placeholder="Password" />
                  </Form.Item>
                  </div>
                  <div class="row justify-content-center align-items-center">
                  <div class="col-lg-5 col-12">
                    <Link to="/signup">
                      SignUp Here!
                    </Link>
                    </div>
                    
                      <div class="col-lg-5 col-12">
                        <button className="form-control" type="submit">Login</button>
                      
                    </div>
                  </div>
                </Form>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
