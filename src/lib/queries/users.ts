import { useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { setStoredUser, getStoredUser } from '@/lib/userStorage';

type User = {
    user_name: string;
    full_name: string;
    email: string;
    password: string;
}

const useCreateAccount = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (user: User) => {
            return axios.post('/api/users', user)
        },
        onSuccess: (response) => {
            const createdUser = response.data;
            queryClient.setQueryData(["currentUser"], createdUser);
            setStoredUser(createdUser);
        },
    });
    
};

export const useCurrentUser = (id?: string) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const stored = getStoredUser();
        if (stored) {
            queryClient.setQueryData(["currentUser"], stored);
        }
    }, [queryClient]);

    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const { data } = await axios.get(`/api/users/${id}`);
            return data;
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
        enabled: Boolean(id),
    });
}

export default useCreateAccount;