import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import { fetchUserProfile } from "../../actions/UserAction";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // This will get the user ID from the URL

  // Fetch the user's profile when the component mounts or the ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchUserProfile(id));
    }
  }, [id, dispatch]);

  // If you want to display some data from the Redux store, you can use the useSelector hook
  // For example, to get the viewed user's profile:
  const viewedUserProfile = useSelector((state) => state.authReducer.viewedUserProfile);

  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-center">
        {/* You can pass the viewedUserProfile as a prop to ProfileCard if needed */}
        <ProfileCard location='profilePage' userProfile={viewedUserProfile} />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
