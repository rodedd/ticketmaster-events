import { useState } from 'react';

// Hook para hacer llamada a la API y guardarlo en estado LOCAL
const useEventsData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  // useEffect(() => {
    // setTimeout(() => {
    //   try {
    //     setData(eventsJSON);
    //     setIsLoading(false);
    //   } catch (error) {
    //     setError(error);
    //   }
    // }, 500);
  // }, []);

  const fetchEvents = async (params) => {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX&classificationName=%5B'Music'%5D${params?.length ? params : ''}`);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  console.log(data);

  return {
    events: data?._embedded?.events || [],
    page: data?.page || {},
    isLoading,
    error,
    fetchEvents
  }
};

export default useEventsData;