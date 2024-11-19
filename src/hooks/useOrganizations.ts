import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { Organization } from '../types/api';

export const useOrganizations = () => {
  const queryClient = useQueryClient();

  const { data: organizations, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const response = await api.get('/api/organizations/');
      return response.data.data;
    },
  });

  const createOrganization = useMutation({
    mutationFn: async (newOrg: Organization) => {
      const response = await api.post('/api/organizations/', newOrg);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });

  const updateOrganization = useMutation({
    mutationFn: async ({ id, ...data }: Organization) => {
      const response = await api.put(`/api/organizations/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });

  return {
    organizations,
    isLoading,
    createOrganization,
    updateOrganization,
  };
}; 