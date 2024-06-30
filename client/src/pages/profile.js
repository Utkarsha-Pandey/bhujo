import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../comp/Layout/Layout";

const UserProfile = () => {
  const [loginUser, setLoginUser] = useState(null);
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
    fetchUser();
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

  return (
    <Layout>
      <section className="hero-section d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="text-center mx-auto">
              <div className="mx-auto">
                <h2 className="hero-title text-center mb-4 pb-2">Profile</h2>
                <div className="profile-details mb-4">
                  {loginUser ? (
                    <>
                      <img
                        src={`http://localhost:8000/${loginUser.profilePic}` || '/images/user.png'}
                        alt="Profile"
                        className="profile-pic"
                      />
                      <p className="hero-title"><strong>Username:</strong> {loginUser.name}</p>
                      <p className="hero-title"><strong>Email:</strong> {loginUser.email}</p>
                      <p className="hero-title"><strong>User ID:</strong> {loginUser._id}</p>
                      <form onSubmit={handleProfilePicUpload}>
                        <input type="file" name="profilePic" accept="image/*" required />
                        <button type="submit">Upload</button>
                      </form>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserProfile;
