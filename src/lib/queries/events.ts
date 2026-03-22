import { useQueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Radius } from 'lucide-react';

type LocationSearch = {
    lat: number;
    lon: number;
    radius: number;
};


export type Event = {
  id: string;
  name: string;
  venueName: string;
  venueCityName: string;
  categories: string[];
}

export const useLocationSearch = (locationSearch?: LocationSearch) => {
    console.log(locationSearch);
    const lat = Number(locationSearch?.lat.toFixed(6));
    const lon = Number(locationSearch?.lon.toFixed(6));


    return useQuery<Event[]>({
        queryKey: [locationSearch?.lat, locationSearch?.lon],
        queryFn: async () => {
            console.log("query");
            const { data } = await axios.get(`/api/events?lat=${lat}&lon=${lon}&radius=${locationSearch?.radius}`);
            
            return data as Event[];
        },
        enabled: Boolean(locationSearch),
    });
}

export default useLocationSearch;