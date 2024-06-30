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
                        src={loginUser.profilePic || '/images/user.png'}
                        alt="Profile"
                        className="profile-pic"
                      />
                      <p className="hero-title"><strong>Username:</strong> {loginUser.name}</p>
                      <p className="hero-title"><strong>Email:</strong> {loginUser.email}</p>
                      <p className="hero-title"><strong>User ID:</strong> {loginUser._id}</p>
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
