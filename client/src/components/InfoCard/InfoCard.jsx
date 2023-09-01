import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleLogOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const response = await UserApi.getUser(profileUserId);
        setProfileUser(response.data); // Update this line to extract data from the response
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Username: </b>
        </span>
        <span>{profileUser.username}</span>
      </div>
      <div className="info">
        <span>
          <b>Name: </b>
        </span>
        <span>{profileUser.name}</span>
      </div>
      <div className="info">
        <span>
          <b>Year: </b>
        </span>
        <span>{profileUser.year}</span>
      </div>
      <div className="info">
        <span>
          <b>Major: </b>
        </span>
        <span>{profileUser.major}</span>
      </div>
      <div className="info">
        <span>
          <b>Minor: </b>
        </span>
        <span>{profileUser.minor}</span>
      </div>
      <div className="info">
        <span>
          <b>Birthday: </b>
        </span>
        <span>{profileUser.birthday}</span>
      </div>
      <div className="info">
        <span>
          <b>Home: </b>
        </span>
        <span>{profileUser.home}</span>
      </div>
      <div className="info">
        <span>
          <b>Quote: </b>
        </span>
        <span>{profileUser.quote}</span>
      </div>
      <div className="info">
        <span>
          <b>Fun Fact: </b>
        </span>
        <span>{profileUser.funFact}</span>
      </div>
      <div className="info">
        <span>
          <b>Favorite Dartmouth Tradition: </b>
        </span>
        <span>{profileUser.favoriteDartmouthTradition}</span>
      </div>
      <div className="info">
        <span>
          <b>Favorite Thing 1: </b>
        </span>
        <span>{profileUser.favoriteThing1}</span>
      </div>
      <div className="info">
        <span>
          <b>Favorite Thing 2: </b>
        </span>
        <span>{profileUser.favoriteThing2}</span>
      </div>
      <div className="info">
        <span>
          <b>Favorite Thing 3: </b>
        </span>
        <span>{profileUser.favoriteThing3}</span>
      </div>

      {profileUser.dev && (
        <div className="info">
          <span>
            <b>dev</b>
          </span>
        </div>
      )}
      {profileUser.des && (
        <div className="info">
          <span>
            <b>des</b>
          </span>
        </div>
      )}
      {profileUser.pm && (
        <div className="info">
          <span>
            <b>pm</b>
          </span>
        </div>
      )}
      {profileUser.core && (
        <div className="info">
          <span>
            <b>core</b>
          </span>
        </div>
      )}
      {profileUser.mentor && (
        <div className="info">
          <span>
            <b>mentor</b>
          </span>
        </div>
      )}

      <button className="button logout-button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default InfoCard;
