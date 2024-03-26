import { useEffect, useState } from "react";
import { LIKED_EVENTS_STORAGE } from "../../../../utils/constants";
import EventItem from "../../../../components/Events/components/EventItem";
import { useNavigate } from "react-router-dom";

const LikedEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleEventItemClick = (eventId) => {
    navigate(`/detail/${eventId}`);
  };

  useEffect(() => {
    const fetchEventsDetails = async () => {
      try {
        setIsLoading(true);
        const likedEvents = JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE)) || [];
        const results = [];
        console.log(likedEvents);
        for(const eventId of likedEvents) {
          const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`);
          const data = await response.json();
          results.push(data);
        }
        setEvents(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventsDetails();
  }, []);

  if(Object.keys(error).length > 0) {
    return <div>Ha ocurrido un error</div>
  }

  if(isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      {events.map((eventItem, index) => (
        <EventItem 
          key={`liked-event-item-${eventItem.id}-${index}`}
          name={eventItem.name} 
          image={eventItem.images[0].url}
          info={eventItem.info} 
          onEventClick={handleEventItemClick}
          id={eventItem.id}
        />
      ))}
    </div>
  );
}

export default LikedEvents;