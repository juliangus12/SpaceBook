import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div>
          <input
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            name="username"
            className="infoInput"
          />
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            name="name"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.year}
            onChange={handleChange}
            type="text"
            placeholder="Year"
            name="year"
            className="infoInput"
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="dev"
              checked={formData.dev}
              onChange={handleChange}
            />
            Developer
          </label>
          <label>
            <input
              type="checkbox"
              name="des"
              checked={formData.des}
              onChange={handleChange}
            />
            Designer
          </label>
          <label>
            <input
              type="checkbox"
              name="pm"
              checked={formData.pm}
              onChange={handleChange}
            />
            Project Manager
          </label>
          <label>
            <input
              type="checkbox"
              name="core"
              checked={formData.core}
              onChange={handleChange}
            />
            Core Member
          </label>
          <label>
            <input
              type="checkbox"
              name="mentor"
              checked={formData.mentor}
              onChange={handleChange}
            />
            Mentor
          </label>
        </div>

        <div>
          <input
            value={formData.major}
            onChange={handleChange}
            type="text"
            placeholder="Major"
            name="major"
            className="infoInput"
          />
          <input
            value={formData.minor}
            onChange={handleChange}
            type="text"
            placeholder="Minor"
            name="minor"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.birthday}
            onChange={handleChange}
            type="text"
            placeholder="Birthday"
            name="birthday"
            className="infoInput"
          />
          <input
            value={formData.home}
            onChange={handleChange}
            type="text"
            placeholder="Home"
            name="home"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.quote}
            onChange={handleChange}
            type="text"
            placeholder="Quote"
            name="quote"
            className="infoInput"
          />
          <input
            value={formData.funFact}
            onChange={handleChange}
            type="text"
            placeholder="Fun Fact"
            name="funFact"
            className="infoInput"
          />
          <input
            value={formData.favoriteDartmouthTradition}
            onChange={handleChange}
            type="text"
            placeholder="Favorite Dartmouth Tradition"
            name="favoriteDartmouthTradition"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.favoriteThing1}
            onChange={handleChange}
            type="text"
            placeholder="Favorite Thing 1"
            name="favoriteThing1"
            className="infoInput"
          />
          <input
            value={formData.favoriteThing2}
            onChange={handleChange}
            type="text"
            placeholder="Favorite Thing 2"
            name="favoriteThing2"
            className="infoInput"
          />
        <input
            value={formData.favoriteThing3}
            onChange={handleChange}
            type="text"
            placeholder="Favorite Thing 3"
            name="favoriteThing3"
            className="infoInput"
          />
        </div>

        <div>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" onClick = {handleSubmit}type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
