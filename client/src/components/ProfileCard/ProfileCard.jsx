import React from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const viewedUserProfile = useSelector((state) => state.authReducer.viewedUserProfile); // Fetch the viewed user's profile
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const getTrueBooleanFields = (profileUser) => {
    const fields = {
      dev: "Developer",
      des: "Designer",
      pm: "Project Manager",
      core: "Core Member",
      mentor: "Mentor"
    };
    return Object.keys(fields)
      .filter((field) => profileUser[field])
      .map((field) => fields[field])
      .join(", ");
  };

  const profileUser = location === "profilePage" ? viewedUserProfile : user; // Use viewedUserProfile for profilePage, else use the logged-in user's data

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            profileUser.coverPicture
              ? serverPublic + profileUser.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt="CoverImage"
        />
        <img
          src={
            profileUser.profilePicture
              ? serverPublic + profileUser.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>
          {profileUser.firstname} {profileUser.lastname}
        </span>
        <span>{getTrueBooleanFields(profileUser) || "No roles assigned"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{profileUser.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{profileUser.following.length}</span>
            <span>Following</span>
          </div>
          {/* for profilePage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === profileUser._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${profileUser._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
