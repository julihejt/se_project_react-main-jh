import "../ItemCard/ItemCard.css";
import likeButton from "../../assets/likebtn.svg";
import isLikedButton from "../../assets/islikedbtn.svg";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ItemCard({ item, onCardClick, onCardLike, isLoggedIn = false }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const isLiked = item.likes.some((id) => id === currentUser._id);

    {
      isLiked ? setIsLiked(true) : setIsLiked(false);
    }
  }, [item.likes, currentUser._id]);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
    onCardLike(item, isLiked);
  };
  return (
    <li className="card">
      <div className="card__overlay">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <img
            className={"card__like-btn"}
            type="button"
            onClick={handleLike}
            src={isLiked ? isLikedButton : likeButton}
            alt="Like button"
          />
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
