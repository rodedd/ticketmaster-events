import useLikeEvents from '../../../../hooks/useLikeEvents';

import styles from './EventItem.module.css';

import HeartFilled from '../../../../assets/hearth-filled.png';
import HeartUnfilled from '../../../../assets/hearth-unfilled.png';

const EventItem = ({ id, info, name, image, onEventClick }) => {
  const { isEventLiked, toggleEventLike } = useLikeEvents(id);
  const handleSeeMoreClick = (evt) => {
    evt.stopPropagation();
    onEventClick(id);
  };

  const handleHeartClick = () => {
    toggleEventLike();
  };

  return (
    <div className={styles.eventItemContainer}>
      <div className={styles.imagesContainer}>
        <img src={isEventLiked ? HeartFilled : HeartUnfilled} alt="Heart button" className={styles.heartImage} onClick={handleHeartClick} />
        <img src={image} alt={name} width={200} height={200} />
      </div>
      <div className={styles.eventInfo}>
        <h4>{name}</h4>
        <p>{info}</p>
        <button onClick={handleSeeMoreClick}>
          {/* <Link to={`/detail/${id}`}>
            Ver más
          </Link> */}
          Ver más
        </button>
      </div>
    </div>
  );
};

export default EventItem;