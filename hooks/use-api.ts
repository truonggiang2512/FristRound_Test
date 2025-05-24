'use cli'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorType } from 'next/dist/client/components/react-dev-overlay/pages/pages-dev-overlay';

interface ApiError extends Error {
  status?: ErrorType | number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8017/v1'; // Set your API base URL
export const useQueryHook = (key: string, endpoint: string, options = {}) => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const status: ErrorType | number = res.status;

      if (!res.ok) {
        let message = 'Request failed';
        const error = new Error(message) as ApiError;
        error.status = status;
        throw error;
      }

      const json = await res.json();
      return { data: json, status }; // Optionally return status too
    },
    staleTime: 1000 * 60 * 5,
    ...options,
  });

  return {
    statusCode: (error as ApiError)?.status ?? data?.status,
    error,
    isLoading,
    isError,
    refetch,
  };
};

// Custom hook to POST, PUT, DELETE data
export const useMutationHook = (mutationKey: string, url: string, method = 'post', options = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (data: any) => {
      const res = await fetch(`${API_URL}${url}`, {
        method: method.toUpperCase(),
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [mutationKey] });
    },
    ...options,
  });

  return mutation;
};
