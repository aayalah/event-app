import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCategories = () => {
    return useQuery<string[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data } = await axios.get('/api/categories');
            return data as string[];
        },
        staleTime: 1000 * 60 * 10,
    });
};
