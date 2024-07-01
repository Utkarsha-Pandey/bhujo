// UserProfile.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../comp/Layout/Layout";
import FriendRequestsList from "../comp/friendReq";
import FriendList from "../comp/friendList";
import { UserOutlined, MailOutlined, IdcardOutlined, UploadOutlined, FilePdfOutlined, UserAddOutlined } from '@ant-design/icons';

const UserProfile = () => {
  const [loginUser, setLoginUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequestSent, setFriendRequestSent] = useState(false); // State for tracking if friend request is sent
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/users/profile/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");

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

    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(`/users/friend-requests/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setFriendRequests(data.friendRequests);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await fetch(`/users/friends/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setFriends(data.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchUser();
    fetchCurrentUser();
    fetchFriendRequests();
    fetchFriends();
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
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setLoginUser(data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await fetch(`/users/export-expenses-pdf/${userId}`);
      if (!response.ok) throw new Error("Network response was not ok");

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

  const handleAddFriend = async () => {
    try {
      const response = await fetch(`/users/friend-request/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId: currentUser._id }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      setFriendRequestSent(true); // Update state to show that friend request is sent
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleAcceptFriendRequest = async (friendId) => {
    try {
      const response = await fetch(`/users/accept-friend-request/${userId}/${friendId}`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Network response was not ok");

      // Update friend requests list after accepting a friend request
      setFriendRequests((prevRequests) => prevRequests.filter((request) => request._id !== friendId));
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleRejectFriendRequest = async (friendId) => {
    try {
      const response = await fetch(`/users/reject-friend-request/${userId}/${friendId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Network response was not ok");

      // Update friend requests list after rejecting a friend request
      setFriendRequests((prevRequests) => prevRequests.filter((request) => request._id !== friendId));
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  return (
    <Layout>
      <section className="hero-section d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="profile-box box-shadow p-4 mb-4">
                <h2 className="hero-title mb-4 text-center profile-heading">Profile</h2>
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
                          <strong><UserOutlined /> Display Name:</strong> {loginUser.name}
                        </p>
                        <p className="hero-title">
                          <strong><MailOutlined /> Email:</strong> {loginUser.email}
                        </p>
                        <p className="hero-title">
                          <strong><IdcardOutlined /> User ID:</strong> {loginUser._id}
                        </p>
                      </div>
                      {currentUser && currentUser._id !== userId && !friendRequestSent && (
                        <button onClick={handleAddFriend} className="custom-btn-new mt-2">
                          <UserAddOutlined /> Add Friend
                        </button>
                      )}
                      {friendRequestSent && <p>Friend request sent!</p>}
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="export-data-box box-shadow p-4 mb-4 text-center">
                <h2 className="hero-title mb-4 upload-heading"><UploadOutlined /> Change Profile Picture</h2>
                {currentUser && currentUser._id === userId && (
                  <form onSubmit={handleProfilePicUpload} className="d-flex flex-column align-items-center">
                    <input type="file" name="profilePic" accept="image/*" required className="mt-2" />
                    <button type="submit" className="custom-btn-new mt-2">
                      Upload Profile Pic
                    </button>
                  </form>
                )}
              </div>
              <div className="export-data-box box-shadow p-4 mb-4 text-center">
                <h2 className="hero-title mb-4 pdf-export-heading"><FilePdfOutlined /> Export Your Data</h2>
                <button onClick={handleExportPDF} className="custom-btn-new mt-2">
                  Export Expenses as PDF
                </button>
              </div>
            </div>
            <div className="col-md-6 align-items-center">
              <div className="friend-requests-box box-shadow p-4 mb-4 align-items-center">
                <FriendRequestsList
                  friendRequests={friendRequests}
                  handleAcceptFriendRequest={handleAcceptFriendRequest}
                  handleRejectFriendRequest={handleRejectFriendRequest}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="friends-box box-shadow p-4 mb-4 text-center">
                <FriendList friends={friends} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserProfile;
