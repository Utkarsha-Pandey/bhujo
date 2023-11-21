import React from "react";
import Header from "./Header"; // eslint-disable-next-line
import Footer from "./Footer"; // eslint-disable-next-line

const Layout = ( {Children} ) => {
    return (
    <>
        <Header />
        <div className="content"> 
            {Children} 
        </div>
        <Footer />
    </>
    )
}

export default Layout;