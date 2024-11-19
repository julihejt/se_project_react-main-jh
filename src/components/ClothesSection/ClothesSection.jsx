import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import React, { useContext } from "react";
//import { defaultClothingItems } from "../../../utils/constants";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ClothesSection({
  onCardClick,
  handleAddClick,
  clothingItems,
  selectedCard = { selectedCard },
  onCardLike = { onCardLike },
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwned = selectedCard.owner === currentUser._id;
  const clothesSectionItems = `clothes-section__items ${
    isOwned ? "clothes-section__items_visible" : "clothes-section__items_hidden"
  }`;

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__items-title">Your Items</p>
        <button
          type="button"
          className="clothes-section__add-card-button"
          onClick={handleAddClick}
        >
          {" "}
          + Add New
        </button>
      </div>
      <ul className={"clothes-section__items"}>
        {clothingItems
          .filter((item) => {
            return item.owner === currentUser._id;
          })
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
