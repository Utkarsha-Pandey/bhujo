import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../comp/Spinner";
import Layout from "../comp/Layout/Layout";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/signup", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="hero-section d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mx-auto">
              {loading && <Spinner />}
              <Form
                className="custom-form register-form"
                layout="vertical"
                onFinish={submitHandler}
              >
                <h2 className="hero-title text-center mb-4 pb-2">Registration Form</h2>
                <div className="form-floating mb-4 p-0">
                  <Form.Item className="form-floating mb-4 p-0" name="name">
                    <Input type="text" className="form-control" placeholder="Name" required />
                  </Form.Item>
                </div>
                <div className="form-floating p-0">
                  <Form.Item name="email">
                    <Input type="email" className="form-control" placeholder="Email" required />
                  </Form.Item>
                </div>
                <div className="form-floating p-0">
                  <Form.Item name="password">
                    <Input type="password" className="form-control" placeholder="Password" required />
                  </Form.Item>
                </div>
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-5 col-12">
                    <button className="form-control" type="submit">SignUp</button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
