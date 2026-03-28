import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { setStoredUser, clearStoredUser } from '@/lib/userStorage';

type Login = {
    email: string;
    password: string;
}

const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (login: Login) => {
            return axios.post('/api/login', login)
        },
        onSuccess: (response) => {
            const createdUser = response.data.user;
            queryClient.setQueryData(["currentUser"], createdUser);
            setStoredUser(createdUser);
        },
    });
    
};

export default useLogin;

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: () => axios.post('/api/logout'),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["currentUser"] });
            clearStoredUser();
            router.push('/');
        },
    });
};