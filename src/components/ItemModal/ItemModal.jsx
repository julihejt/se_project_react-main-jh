import "../ItemModal/ItemModal.css";

// Define the ItemModal component
function ItemModal({ activeModal, card, closeActiveModal, handleDeleteClick }) {
  return (
    // Conditional class for modal based on activeModal prop
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        {/* Close button with onClick event to trigger onClose function */}
        <button onClick={closeActiveModal} className="modal__close"></button>
        {/* Display the card image */}
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          {/* Display the card name */}
          <h2 className="modal__caption">{card.name}</h2>
          {/* Display the weather associated with the card */}
          <p className="modal__weather">Weather: {card.weather}</p>
          <button onClick={handleDeleteClick} className="modal__delete">
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

// Export the ItemModal component
export default ItemModal;
