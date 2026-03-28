import { QueryCache, QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const getQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: (failureCount, error) => {
                    if (axios.isAxiosError(error) && error.response?.status === 401) return false;
                    return failureCount < 3;
                },
            },
        },
        queryCache: new QueryCache({
            onError: (error) => {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    window.location.href = '/';
                }
            },
        }),
    });
}