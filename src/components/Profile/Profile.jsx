import "./Profile.css";
import SideBar from "../Profile/SideBar/SideBar";
import ClothesSection from "../Profile/ClothesSection/ClothesSection";

// Defining the Profile component which takes props: onCardClick, clothingItems, handleAddClick, and weatherData
function Profile({ onCardClick, clothingItems, handleAddClick, weatherData }) {
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
        />
      </section>
    </div>
  );
}

// Exporting the Profile component as the default export
export default Profile;
