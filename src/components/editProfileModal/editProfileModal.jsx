import React, { useContext, useState, useEffect } from "react"; // Added useEffect
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, closeActiveModal, onEditProfile }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value || "");
  };
  const [avatarUrl, setAvatarUrl] = useState("");
  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value || "");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onEditProfile({ name, avatarUrl });
  };

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText="Change profile data"
      onClose={closeActiveModal}
      isOpen={isOpen}
      name={"editprofile"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__input_type_name">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          //id="name"
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
      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
