import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ isOpen, onClose, card, onDeleteItem, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?.owner === currentUser?._id;

  // Logging to help with debugging
  console.log("Current User:", currentUser);
  console.log("Card Data:", card);
  console.log("onDeleteItem function:", onDeleteItem);

  // CSS class for delete button
  const modalDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  // Ensure card data is loaded before rendering
  if (!card) {
    return null; // If card data is not available, do not render the modal
  }

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close modal__close_type_white"
          type="button"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__left-section">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__right-section">
            {isOwn && (
              <button
                className={modalDeleteButtonClassName}
                onClick={handleDeleteItem}
                type="button"
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
