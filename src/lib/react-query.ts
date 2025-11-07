import { Query, QueryClient } from "@tanstack/react-query";

export const getQueryClient = () => {

    return new QueryClient();
}