import { useEffect, useState } from 'react';
import { useQueryData } from './useQueryData';
import { searchUsers } from '@/actions/user';

const UseSearch = (key: string, type: 'USERS') => {
  const [query, setQuery] = useState<string>('');
  const [debounce, setDebouncing] = useState<string>('');
  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subscription: {
          plan: 'FREE' | 'PRO';
        } | null;
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        email: string | null;
      }[]
    | null
  >(null);

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncing(query);
    }, 1000);

    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      if (type === 'USERS') {
        const users = await searchUsers(queryKey[1] as string);
        if (users.status === 200 && users.data) setOnUsers(users.data);
      }
    },
    false
  );

  useEffect(() => {
    debounce && refetch();
    !debounce && setOnUsers(null);

    return () => {
      debounce;
    };
  }, []);

  return { onSearchQuery, query, isFetching, onUsers };
};

export default UseSearch;
