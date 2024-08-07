import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../comp/Spinner";
import Header from "../comp/Layout/Header";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


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
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  //google login
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    try {
      setLoading(true);
      const { data } = await axios.post("/users/google-signin", details);
      setLoading(false);
      message.success("Google login success");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />


      <section className="hero-section d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-12 mx-auto">
              {loading && <Spinner />}

              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
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
                <div className="row justify-content-center align-items-center">

                  <div className="col-lg-5 col-12">
                    <button className="form-control" type="submit">Login</button>
                  </div>
                  <br />
                  <div className="col-lg-5 col-12 hero-title text-center mb-4 pb-2">
                    <Link to="/signup" className="hero-title">
                      SignUp Here!
                    </Link>
                  </div>
                </div>
              </Form>
            </div>

          </div>
        </div>
      </section>

    </>
  );
};

export default Login;
