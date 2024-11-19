import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { AcademicSession } from '../types/api';

export const useAcademicSessions = () => {
  const queryClient = useQueryClient();

  const { data: academicSessions, isLoading } = useQuery({
    queryKey: ['academicSessions'],
    queryFn: async () => {
      const response = await api.get('/api/academic-sessions/');
      return response.data.data;
    },
  });

  const createAcademicSession = useMutation({
    mutationFn: async (newSession: AcademicSession) => {
      const response = await api.post('/api/academic-sessions/', newSession);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['academicSessions'] });
    },
  });

  const updateAcademicSession = useMutation({
    mutationFn: async ({ id, ...data }: AcademicSession) => {
      const response = await api.put(`/api/academic-sessions/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['academicSessions'] });
    },
  });

  return {
    academicSessions,
    isLoading,
    createAcademicSession,
    updateAcademicSession,
  };
}; 