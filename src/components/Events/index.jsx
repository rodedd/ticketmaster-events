import { useNavigate } from "react-router-dom";
import EventItem from "./components/EventItem";
import { memo } from 'react';

const Events = ({ searchTerm, events }) => {
  const navigate = useNavigate();

  const handleEventItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const renderEvents = () => {
    let eventsFiltered = events;

    if(searchTerm.length > 0) {
      eventsFiltered = eventsFiltered.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return eventsFiltered.map((eventItem) => (
      <EventItem 
        key={`event-item-${eventItem.id}`}
        name={eventItem.name} 
        image={eventItem.images[0].url}
        info={eventItem.info} 
        onEventClick={handleEventItemClick}
        id={eventItem.id}
      />
    ));
  }

  return (
    <div>
      <div>Eventos</div>
      {renderEvents()}
    </div>
  );
};

export default memo(Events);