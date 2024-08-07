import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import React from "react";
import { defaultClothingItems } from "../../../utils/constants";
function ClothesSection({ onCardClick, handleAddClick, clothingItems }) {
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
      <ul className="clothes-section__items">
        {defaultClothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
