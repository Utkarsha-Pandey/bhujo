import React, {useState, useEffect } from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import Spinner from "../comp/files/Spinner";

const Signin = () => {
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
       setLoading(true);
      const { data } = await axios.post("./user/signin", values);
       setLoading(false);
      message.success("login Successful");
      localStorage.setItem(
        "user",
        JSON.stringyfy({ ...data.user, password: "" })
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
                
                <Form layout="vertical" onFinish={submitHandler}>
                  <h1 align>Login Form</h1>
                  <div className="form-floating mb-4 p-0">
                  <Form.Item label="Email" name="email">
                    <Input type="email" />
                  </Form.Item>
                  </div>

                  <div className="form-floating p-0">
                  <Form.Item label="Password" name="password">
                    <Input type="password" />
                  </Form.Item>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link to="/register">
                      Not a user ? Cleck Here to regsiter
                    </Link>
                    <button className="btn btn-primary" type="submit">Login</button>
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

export default Signin;
