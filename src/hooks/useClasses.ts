import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { Class } from '../types/api';

export const useClasses = () => {
  const queryClient = useQueryClient();

  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const response = await api.get('/api/classes/');
      return response.data.data;
    },
  });

  const createClass = useMutation({
    mutationFn: async (newClass: Class) => {
      const response = await api.post('/api/classes/', newClass);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });

  const updateClass = useMutation({
    mutationFn: async ({ id, ...data }: Class) => {
      const response = await api.put(`/api/classes/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });

  return {
    classes,
    isLoading,
    createClass,
    updateClass,
  };
}; 