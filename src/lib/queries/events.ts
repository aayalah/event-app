import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

type LocationSearch = {
    lat: number;
    lon: number;
    radius: number;
    date?: string;
};


export type Event = {
  id: string;
  name: string;
  venueName: string;
  venueCityName: string;
  categories: string[];
  date: string;
}

export const useLocationSearch = (locationSearch?: LocationSearch) => {
    console.log(locationSearch);
    const lat = Number(locationSearch?.lat.toFixed(6));
    const lon = Number(locationSearch?.lon.toFixed(6));


    return useQuery<Event[]>({
        queryKey: [locationSearch?.lat, locationSearch?.lon, locationSearch?.date],
        queryFn: async () => {
            const params = new URLSearchParams({
                lat: String(lat),
                lon: String(lon),
                radius: String(locationSearch?.radius),
            });
            if (locationSearch?.date) params.set("date", locationSearch.date);
            const { data } = await axios.get(`/api/events?${params.toString()}`);
            return data as Event[];
        },
        enabled: Boolean(locationSearch),
    });
}

export default useLocationSearch;