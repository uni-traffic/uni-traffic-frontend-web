import { getSignedUrl } from "@/api/request/file/getSignedUrl";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

type Params = { path: string };
type Response = string;

export const useGetSignedUrl = (params: Params, options?: UseQueryOptions<Response, Error>) => {
  return useQuery({
    queryKey: ["signed-url", params],
    queryFn: () => getSignedUrl(params),
    ...options
  });
};
