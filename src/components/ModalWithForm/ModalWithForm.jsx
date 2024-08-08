import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  closeActiveModal,
  children,
  buttonText,
  title,
  activeModal,
  onSubmit, // expecting to receive the handleSubmit function
}) {
  console.log(title);
  return (
    // Main container for the modal, conditionally adding the 'modal_opened' class
    <div className={`modal ${activeModal && "modal_opened"}`}>
      <div className="modal__content">
        {/* Title of the modal */}
        <h2 className="modal__title">{title}</h2>

        {/* Button to close the modal, triggering closeActiveModal function */}
        <button onClick={closeActiveModal} className="modal__close" />

        {/* Form inside the modal */}
        <form
          className="modal__form"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          {" "}
          {/* Using the passed onSubmit function */}
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
