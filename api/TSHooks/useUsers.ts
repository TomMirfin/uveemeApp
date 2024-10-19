import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getAllUsers, getUserById } from 'api/Api';

const queryClient = new QueryClient();

export function useUsers() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      getAllUsers().then((data) => {
        return data;
      }),
  });
  return { users, isLoading, error };
}

export function useUserById(id: string) {
  const {
    data: userById,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      getUserById(id).then((data) => {
        return data;
      }),
  });
  return { userById, isLoading, error };
}
