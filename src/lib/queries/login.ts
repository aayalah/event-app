import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';

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
            const createdUser = response.data;
            queryClient.setQueryData(["currentUser"], createdUser);
        },
    });
    
};

export default useLogin;