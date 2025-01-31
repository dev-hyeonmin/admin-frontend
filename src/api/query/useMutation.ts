import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCustomMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  queryKey?: string[],
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: unknown) => void;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      options?.onError?.(error);
    },
  });
};
