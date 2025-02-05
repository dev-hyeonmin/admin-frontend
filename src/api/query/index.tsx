import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./queryClient";

/**
 * React Query 설정을 제공하는 컴포넌트
 * App 전체에서 React Query를 사용할 수 있도록 설정
 */
const ReactQueryProvider = ({children}: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
