import { createGroup, getAllGroups, getGroupById, getGroupsForUser } from '../Api';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export function useGroups() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['groups'],
    queryFn: () =>
      getAllGroups().then((data) => {
        return data;
      }),
  });
  return { data, isLoading, error };
}

export function useGroupsForUser(id: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['groups'],
    queryFn: () =>
      getGroupsForUser(id).then((data) => {
        return data;
      }),
  });

  const forceRefetch = () => queryClient.invalidateQueries({ queryKey: ['groups'] });

  return { data, isLoading, error, forceRefetch };
}

export function useGroupById(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['groups'],
    queryFn: () =>
      getGroupById(id).then((data) => {
        return data;
      }),
  });
  return { data, isLoading, error };
}

export function useCreateGroup() {
  const { data, error, mutate } = useMutation({
    mutationKey: ['groups'],
    mutationFn: (data: any) =>
      createGroup(data).then((data) => {
        return data;
      }),
  });
  return { data, error, mutate };
}
