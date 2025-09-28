import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DashBoard from "./pages/dashboard";
import Signup from "./pages/signup";
import Login from "./pages/signin";
import UserProfile from "./pages/profile";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Connect to backend Socket.IO server
const socket = io("http://localhost:8000");

function App() {
  useEffect(() => {
    // Listen for notifications from server
    socket.on("notification", (data) => {
      toast.info(data.message, {
        position: "top-right",
        autoClose: 3000,
      });
    });

    // Cleanup listener on unmount
    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <>
      <Routes>
        {/* Redirect root to signin */}
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <DashBoard />
            </ProtectedRoutes>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
      </Routes>

      {/* Toast notifications container */}
      <ToastContainer />
    </>
  );
}

export function ProtectedRoutes({ children }) {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/signin" />;
  }
}

export default App;
