import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input , Form , message } from "antd";

const Signup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    //form submit
    const submitHandler = async (values) => {
        try {
            setLoading(true)
            await axios.post('/api/v1/users/signup', values)
            message.success('Registration Successful')
            setLoading(false)
            navigate('/signin')
        } catch (error) {
            setLoading(false)
            message.error('invalid username or password')

        }
    };

    //prevent for login user
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
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
                                            <img src="images/pyramids(1).png" width="35px" height="35px" alt="rgvrv" />
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
                                                href="signin"
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
                <div
                    className="offcanvas offcanvas-end"
                    data-bs-scroll="true"
                    tabIndex={-1}
                    id="offcanvasMenu"
                    aria-labelledby="offcanvasMenuLabel"
                >
                    <div className="offcanvas-header">
                        <button
                            type="button"
                            className="btn-close ms-auto"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        />
                    </div>
                    <div className="offcanvas-body d-flex flex-column justify-content-center align-items-center">
                        <nav>
                            <ul>
                                <li>
                                    <a href="signin">Login Form</a>
                                </li>
                                <li>
                                    <a className="active" href="signup">
                                        Create an account
                                    </a>
                                </li>
                                <li>
                                    <a href="password-reset.html">Password Reset</a>
                                </li>
                                <li>
                                    <a href="404.html">404 Page</a>
                                </li>
                                <li>
                                    <a href="contact.html">Contact Form</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                
                <section className="hero-section hero-bg d-flex justify-content-center align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-12 mx-auto">

                            {loading}

                                <Form
                                    className="register-form"
                                    layout="vertical"
                                    onFinish={submitHandler}
                                >
                                    <h2>Register Form</h2>
                                    <Form.Item label="Name" name="name">
                                        <Input type="text" required />
                                    </Form.Item>
                                    <Form.Item label="Email" name="email">
                                        <Input type="email" required />
                                    </Form.Item>
                                    <Form.Item label="Password" name="password">
                                        <Input type="password" required />
                                    </Form.Item>
                                    <div className="d-flex justify-content-between">
                                        
                                        <button className="btn btn-primary">SignUp</button>
                                    </div>
                                    </Form>



                                    {/* <form className="custom-form" method="post">
                                    <h2 className="hero-title text-center mb-4 pb-2">
                                        Create an account
                                    </h2>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="Full Name"
                                                    required=""
                                                />
                                                <label htmlFor="floatingInput">Full Name</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-floating mb-4 p-0">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    pattern="[^ @]*@[^ @]*"
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    required=""
                                                />
                                                <label htmlFor="email">Email address</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-12">
                                            <div className="form-floating p-0">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    required=""
                                                />
                                                <label htmlFor="password">Password</label>
                                            </div>
                                            <div className="form-check mb-4">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    defaultValue=""
                                                    id="flexCheckDefault"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="flexCheckDefault"
                                                >
                                                    I agree to the Terms of Service and Privacy Policy.
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center align-items-center">
                                            <div className="col-lg-5 col-md-5 col-5 ms-auto">
                                                <button type="submit" className="form-control">
                                                    Submit
                                                </button>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-7">
                                                <p className="mb-0">
                                                    Already have an account?{" "}
                                                    <a href="signin" className="ms-2">
                                                        Login
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </form> */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>


        </>
    )
}

export default Signup;