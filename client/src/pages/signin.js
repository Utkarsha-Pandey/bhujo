import React from "react";

const Signin = () => {
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
                                            <img src="images/pyramids (1).png" width="35px" height="35px" />
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
                                <form className="custom-form login-form" role="form" method="post">
                                    <h2 className="hero-title text-center mb-4 pb-2">Login Form</h2>
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
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="row justify-content-center align-items-center">
                                        <div className="col-lg-5 col-12">
                                            <button type="submit" className="form-control">
                                                Login
                                            </button>
                                        </div>
                                        <div className="col-lg-5 col-12">
                                            <a
                                                href="signup"
                                                className="btn custom-btn custom-border-btn"
                                            >
                                                Register
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}

export default Signin;