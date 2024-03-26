import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import useEventResults from "../../state/events-results";
import styles from './Detail.module.css';

const Detail = () => {
  const { data } = useEventResults();
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log('data', data);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`);
        const data = await response.json();
        setEventData(data);
        setIsLoading(false);
      } catch (error) {
        setEventData({});
        setError(error);
        setIsLoading(false);
      }
    };
    fetchEventData();
  }, []);

  if(isLoading && Object.keys(eventData) === 0) {
    return <div>Cargandoooo...</div>
  }

  if(Object.keys(error) > 0) {
    return <div>Ha ocurrido un error :(</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainInfoContainer}>
        <img src={eventData.images?.[0].url} alt={eventData.name} />
        <h4>{eventData.name}</h4>
        <p>{eventData.info}</p>
        {eventData.dates?.start.dateTime ? <p>{format(new Date(eventData.dates?.start.dateTime), 'd LLLL yyyy H:mm', { locale: es })} hrs</p> : null}
      </div>
      <div className={styles.seatInfoContainer}>
        <h6>Mapa del evento</h6>
        <img src={eventData.seatmap?.staticUrl} alt="Seatmap event" />
        <p>{eventData.pleaseNote}</p>
        <p>Rango de precios: {eventData.priceRanges?.[0].min} - {eventData.priceRanges?.[0].max}</p>
      </div>
      <a href={eventData.url}>Comprar boletos</a>
    </div>
  );
};

export default Detail;