import { useMutation } from '@tanstack/react-query'
import axios from 'axios';

type User = {
    user_name: string;
    full_name: string;
    email: string;
    password: string;
}

const useCreateAccount = () => {
    
    return useMutation({
        mutationFn: (user: User) => {
            return axios.post('/api/users', user)
        },
    });
    
};

export default useCreateAccount;