import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        //요청이 실패하면 기본 3번 요청하는데 일단 false
        queries: {
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
})

export default queryClient;