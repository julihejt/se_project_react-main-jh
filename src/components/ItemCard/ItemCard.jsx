import "../ItemCard/ItemCard.css";

function ItemCard({ item, onCardClick }) {
  // Handle card click event
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card-container">
      {/* Display the item name */}
      <h2 className="card__title">{item.name}</h2>
      {/* Display the item image with click event handler */}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

// Export the ItemCard component
export default ItemCard;
