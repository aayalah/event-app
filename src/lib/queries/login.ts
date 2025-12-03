import { useMutation } from '@tanstack/react-query'
import axios from 'axios';

type Login = {
    email: string;
    password: string;
}

const useLogin = () => {
    
    return useMutation({
        mutationFn: (login: Login) => {
            return axios.post('/api/login', login)
        },
    });
    
};

export default useLogin;