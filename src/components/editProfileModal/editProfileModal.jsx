import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ activeModal, closeActiveModal, onEditProfile }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const [avatarUrl, setAvatarUrl] = useState("");
  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onEditProfile({ name, avatarUrl });
  };
  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText="Change profile data"
      activeModal={activeModal}
      onClose={closeActiveModal}
      isOpen={activeModal === "editprofile"}
      name={"editprofile"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__input_type_name">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__input_type_avatarurl">
        Avatar *{" "}
        <input
          type="url"
          className="modal__input"
          id="avatarurl"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
