import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

// Defining the Profile component which takes props: onCardClick, clothingItems, handleAddClick, and weatherData
function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  weatherData,
  selectedCard,
  onCardLike = { onCardLike },
}) {
  return (
    // Main container for the profile component
    <div className="profile">
      {/* Section containing the sidebar, passing weatherData as a prop to SideBar component */}
      <section className="profile__sidebar">
        <SideBar weatherData={weatherData} />
      </section>

      {/* Section containing the clothing items, passing props to ClothesSection component */}
      <section className="clothes-section__items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          selectedCard={selectedCard}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

// Exporting the Profile component as the default export
export default Profile;
