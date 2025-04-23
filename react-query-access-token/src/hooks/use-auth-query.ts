/*
  🚨
  This is probably the file you came to this repo for originally. For convenience it contains both the `useAuthQuery` hook for regular queries and the
  useAuthSuspenseQuery for suspensible queries. 
*/
import { useAuth } from "../context/auth-context";
import {
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

export type BaseAuthQueryKey = [string, Record<string, unknown>?];
export type AuthQueryOptions<
  TQueryKey extends BaseAuthQueryKey,
  TQueryFnData,
  TError,
  TData = TQueryFnData
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export const useAuthQuery = <
  TQueryKey extends BaseAuthQueryKey,
  TQueryFnData,
  TError,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
  options?: AuthQueryOptions<TQueryKey, TQueryFnData, TError, TData>
) => {
  const { getAccessToken } = useAuth();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const token = await getAccessToken();
      return fetcher(queryKey[1], token);
    },
    ...options,
  });
};

export type AuthSuspenseQueryOptions<
  TQueryKey extends BaseAuthQueryKey,
  TQueryFnData,
  TError,
  TData = TQueryFnData
> = Omit<
  UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export const useAuthSuspenseQuery = <
  TQueryKey extends BaseAuthQueryKey,
  TQueryFnData,
  TError,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
  options?: AuthSuspenseQueryOptions<TQueryKey, TQueryFnData, TError, TData>
) => {
  const { getAccessToken } = useAuth();

  return useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      const token = await getAccessToken();
      return fetcher(queryKey[1], token);
    },
    ...options,
  });
};
