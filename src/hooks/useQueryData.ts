import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
} from '@tanstack/react-query';

export const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled: Enabled
) => {
  const { data, isPending, isFetching, isFetched, isError, refetch } = useQuery(
    {
      queryKey,
      queryFn,
      enabled,
    }
  );

  return { data, isPending, isFetched, isFetching, isError, refetch };
};
