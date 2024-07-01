import React from "react";

const FriendList = ({ friends }) => {
  return (
    <div className="col-md-6 friend-list-wrapper text-center align-items-center">
      <h2 className="hero-title mb-4 text-center">My Friends</h2>
      <div className="friend-list">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend._id} className="friend-box">
              <img
                src={`http://localhost:8000/${friend.profilePic}`}
                alt="Profile"
                className="profile-pic"
              />
              <div className="profile-info mt-3 text-center">
                <p className="hero-title">
                  <a href={`/profile/${friend._id}`} className="hero-title">
                  {friend.name}
                  </a>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="profile-heading">No friends added yet</p>
        )}
      </div>
    </div>
  );
};

export default FriendList;
