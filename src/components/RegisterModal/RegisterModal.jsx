import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  closeActiveModal, // This will be passed as the onClose prop to ModalWithForm
  onSignUp,
  openLoginModal = () => {}, // Default to an empty function if not provided
}) {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatarUrl, setAvatarUrl] = useState("");
  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ email, password, name, avatarUrl });
  };

  return (
    <ModalWithForm
      titleText="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={closeActiveModal} // Pass closeActiveModal as the onClose handler
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__input_type_name">
        Email{" "}
        <input
          type="text"
          className="modal__input"
          //id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>

      <label htmlFor="password" className="modal__input_type_password">
        Password{" "}
        <input
          type="password" // Changed type to password for security
          className="modal__input"
          //id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>

      <label htmlFor="name" className="modal__input_type_name">
        Name{" "}
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
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          //id="avatarurl"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
        />
      </label>

      <div className="modal__buttons-wrapper">
        <button type="submit" className="modal__submit">
          Sign Up
        </button>

        <button
          type="button"
          className="modal__or-login-btn"
          onClick={openLoginModal} // Trigger the login modal
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
