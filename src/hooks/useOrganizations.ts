/**
 * Organization Hooks
 * 
 * React Query hooks để quản lý tổ chức.
 */

"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import OrganizationModel from '@/src/model/Organization';

// Query Keys
export const organizationKeys = {
    all: ['organizations'] as const,
    lists: () => [...organizationKeys.all, 'list'] as const,
    list: (filters: any) => [...organizationKeys.lists(), filters] as const,
    details: () => [...organizationKeys.all, 'detail'] as const,
    detail: (id: number) => [...organizationKeys.details(), id] as const,
};

/**
 * Hook để lấy danh sách tổ chức
 */
export function useOrganizations(filters?: any) {
    return useQuery({
        queryKey: organizationKeys.list(filters),
        queryFn: () => OrganizationModel.getAll(filters),
    });
}

/**
 * Hook để lấy tổ chức theo ID
 */
export function useOrganization(id: number) {
    return useQuery({
        queryKey: organizationKeys.detail(id),
        queryFn: () => OrganizationModel.getById(id),
        enabled: !!id,
    });
}

/**
 * Hook để tạo tổ chức mới
 */
export function useCreateOrganization() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => OrganizationModel.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });
        },
    });
}

/**
 * Hook để cập nhật tổ chức
 */
export function useUpdateOrganization() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => 
            OrganizationModel.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: organizationKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });
        },
    });
}

/**
 * Hook để xóa tổ chức
 */
export function useDeleteOrganization() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => OrganizationModel.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });
        },
    });
}
