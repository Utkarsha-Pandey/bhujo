// FriendRequestsList.js

import React from "react";

const FriendRequestsList = ({ friendRequests, handleAcceptFriendRequest, handleRejectFriendRequest }) => {
  return (
    <div className="col-md-6 friend-requests-wrapper text-center">
      <h2 className="hero-title mb-4">Friend Requests</h2>
      <div className="friend-requests d-flex flex-wrap justify-content-center">
        {friendRequests.length > 0 ? (
          friendRequests.map((request) => (
            <div key={request._id} className="friend-request-box mb-3 mr-3 p-3">
              <img
                src={`http://localhost:8000/${request.profilePic}`}
                alt="Profile"
                className="profile-pic"
              />
              <div className="profile-info mt-3 text-center">
                <p className="hero-title">
                  <strong>{request.name}</strong>
                </p>
                <button
                  onClick={() => handleAcceptFriendRequest(request._id)}
                  className="custom-btn-new mt-2 mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectFriendRequest(request._id)}
                  className="custom-btn-new mt-2"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No friend requests</p>
        )}
      </div>
    </div>
  );
};

export default FriendRequestsList;
