import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../comp/Layout/Layout";

const UserProfile = () => {
  const [loginUser, setLoginUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Add state to store the current logged-in user
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/users/profile/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLoginUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchCurrentUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);
    };

    fetchUser();
    fetchCurrentUser();
  }, [userId]);

  const handleProfilePicUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePic", e.target.profilePic.files[0]);

    try {
      const response = await fetch(`/users/profile/upload/${userId}`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLoginUser(data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await fetch(`/users/export-expenses-pdf/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expenses.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error exporting expenses:", error);
    }
  };

  return (
    <Layout>
      <section className="hero-section d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="profile-wrapper text-center">
              <h2 className="hero-title mb-4">Profile</h2>
              <div className="profile-details d-flex flex-column align-items-center">
                {loginUser ? (
                  <div className="profile-content d-flex flex-column align-items-center">
                    <img
                      src={`http://localhost:8000/${loginUser.profilePic}`}
                      alt="Profile"
                      className="profile-pic"
                    />
                    <div className="profile-info mt-3 text-center">
                      <p className="hero-title">
                        <strong>Username:</strong> {loginUser.name}
                      </p>
                      <p className="hero-title">
                        <strong>Email:</strong> {loginUser.email}
                      </p>
                      <p className="hero-title">
                        <strong>User ID:</strong> {loginUser._id}
                      </p>
                    </div>
                    {currentUser && currentUser._id === userId && (
                      <div className="profile-actions mt-3">
                        <form onSubmit={handleProfilePicUpload} className="d-flex flex-column align-items-center">
                          <input type="file" name="profilePic" accept="image/*" required className="mt-2" />
                          <button type="submit" className="custom-btn-new mt-2">
                            Upload
                          </button>
                        </form>
                        <button onClick={handleExportPDF} className="custom-btn-new mt-2">
                          Export Expenses as PDF
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserProfile;
