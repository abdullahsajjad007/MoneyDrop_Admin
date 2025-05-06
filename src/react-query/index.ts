import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function queryErrorHandler(error: unknown) {
  // const id = "react-query-error";
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  toast.error(title);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 600000,
      cacheTime: 900000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
