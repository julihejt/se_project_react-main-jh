import React from "react";
import "./ModalWithForm.css";

// Defining the ModalWithForm functional component, which takes several props
function ModalWithForm({
  closeActiveModal, // Function to close the modal
  children, // Children components to be rendered inside the form
  buttonText, // Text for the submit button
  title, // Title of the modal
  activeModal, // Boolean to determine if the modal is active
}) {
  return (
    // Main container for the modal, conditionally adding the 'modal_opened' class
    <div className={`modal ${activeModal && "modal_opened"}`}>
      <div className="modal__content">
        {/* Title of the modal */}
        <h2 className="modal__title">{title}</h2>

        {/* Button to close the modal, triggering closeActiveModal function */}
        <button onClick={closeActiveModal} className="modal__close" />

        {/* Form inside the modal */}
        <form className="modal__form">
          {/* Rendering children components inside the form */}
          {children}

          {/* Submit button for the form */}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

// Exporting the ModalWithForm component as the default export
export default ModalWithForm;
