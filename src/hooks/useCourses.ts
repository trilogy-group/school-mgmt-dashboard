import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { Course } from '../types/api';

export const useCourses = () => {
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await api.get('/api/courses/');
      return response.data.data;
    },
  });

  const createCourse = useMutation({
    mutationFn: async (newCourse: Course) => {
      const response = await api.post('/api/courses/', newCourse);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const updateCourse = useMutation({
    mutationFn: async ({ id, ...data }: Course) => {
      const response = await api.put(`/api/courses/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  return {
    courses,
    isLoading,
    createCourse,
    updateCourse,
  };
}; 