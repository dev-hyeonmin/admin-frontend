import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 포커스 시 리패치 방지
      retry: 1, // 실패 시 1번만 재시도
    },
  },
});
