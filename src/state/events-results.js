import { create } from "zustand";

// Hook para hacer llamada a la API y guardarlo en estado GLOBAL
const useEventResults = create((set) => ({
  data: [],
  error: null,
  isLoading: false,
  fetchEvents: async (params) => {
    try {
      await set(() => ({ isLoading: true }));
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX&classificationName=%5B'Music'%5D${params?.length ? params : ''}`);
      const data = await response.json();
      await set(() => ({ data, isLoading: false }));
    } catch (error) {
      await set(() => ({ error }));
    }
  }
}));

console.log('hooooook')

export default useEventResults;