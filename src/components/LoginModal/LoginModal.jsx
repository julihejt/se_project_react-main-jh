import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  onLogIn,
  closeActiveModal,
  handleRegisterModal,
}) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogIn({ email, password });
  };

  return (
    <ModalWithForm
      titleText="Log in"
      buttonText="Log in"
      onClose={closeActiveModal}
      isOpen={isOpen}
      name={"login"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__input_type_email">
        Email{" "}
        <input
          type="text"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__input_type_password">
        Password{" "}
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <div className="modal__buttons-wrapper">
        <button type="submit" className="modal__submit">
          Log In
        </button>
        <button
          type="button"
          className="modal__or-signup-btn"
          onClick={handleRegisterModal}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};
export default LoginModal;
