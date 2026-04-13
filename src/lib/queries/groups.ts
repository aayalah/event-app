import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

type LocationSearch = {
    city:   string;
    country: string;
    category?: string;
};

export type Group = {
  id: string;
  name: string;
  categories: string[];
  city: string;
  country: string;
}

export const useLocationSearch = (locationSearch?: LocationSearch) => {

    return useQuery<Group[]>({
        queryKey: ["groups", locationSearch?.city, locationSearch?.country, locationSearch?.category],
        queryFn: async () => {
            const params = new URLSearchParams({
                city: locationSearch!.city,
                country: locationSearch!.country,
            });
            if (locationSearch?.category) params.set("category", locationSearch.category);
            const { data } = await axios.get(`/api/groups?${params.toString()}`);
            return data as Group[];
        },
        enabled: Boolean(locationSearch),
    });
}

export default useLocationSearch;