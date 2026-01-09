/**
 * Organization Service
 * 
 * Service để fetch và quản lý dữ liệu tổ chức từ API backend.
 * Fallback về mock data khi API không khả dụng.
 */

import OrganizationModel from '@/src/model/Organization';
import { 
  mockOrganizations, 
  OrganizationItem, 
  organizationStatusConfig 
} from '@/src/data/organizationsData';

// Re-export types và constants
export { organizationStatusConfig } from '@/src/data/organizationsData';
export type { OrganizationItem } from '@/src/data/organizationsData';

// Flag để toggle giữa API và mock data
const USE_API = true;

/**
 * Convert API organization to OrganizationItem format
 */
function convertApiToOrganizationItem(apiOrg: any): OrganizationItem {
  return {
    id: apiOrg.organization_id || apiOrg.id,
    name: apiOrg.name,
    streetAddress: apiOrg.street_address || apiOrg.streetAddress || '',
    wardCode: apiOrg.ward_code || apiOrg.wardCode || 0,
    provinceCode: apiOrg.province_code || apiOrg.provinceCode || 0,
    phone: apiOrg.phone || '',
    email: apiOrg.email || '',
    managerId: apiOrg.manager_id || apiOrg.managerId || 0,
    studentCount: apiOrg.student_count || apiOrg.studentCount || 0,
    teacherCount: apiOrg.teacher_count || apiOrg.teacherCount || 0,
    status: apiOrg.status || 'active',
    description: apiOrg.description,
    openingHours: apiOrg.opening_hours || apiOrg.openingHours,
    createdAt: apiOrg.created_at || apiOrg.createdAt,
    updatedAt: apiOrg.updated_at || apiOrg.updatedAt,
  };
}

/**
 * Lấy tất cả organizations từ API
 */
export async function fetchAllOrganizations(query?: any): Promise<OrganizationItem[]> {
  if (!USE_API) {
    return mockOrganizations;
  }

  try {
    const response = await OrganizationModel.getAll(query);
    if (response && Array.isArray(response)) {
      return response.map(convertApiToOrganizationItem);
    }
    if (response?.organizations && Array.isArray(response.organizations)) {
      return response.organizations.map(convertApiToOrganizationItem);
    }
    return mockOrganizations;
  } catch (error) {
    console.error('Error fetching organizations from API, falling back to mock data:', error);
    return mockOrganizations;
  }
}

/**
 * Lấy organization theo ID
 */
export async function fetchOrganizationById(id: number): Promise<OrganizationItem | undefined> {
  if (!USE_API) {
    return mockOrganizations.find(o => o.id === id);
  }

  try {
    const response = await OrganizationModel.getById(id);
    const data = response?.organization || response;
    if (data) {
      return convertApiToOrganizationItem(data);
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching organization ${id} from API:`, error);
    return mockOrganizations.find(o => o.id === id);
  }
}

/**
 * Tạo organization mới
 */
export async function createOrganization(data: Partial<OrganizationItem>): Promise<OrganizationItem | null> {
  try {
    const response = await OrganizationModel.create(data);
    if (response) {
      return convertApiToOrganizationItem(response);
    }
    return null;
  } catch (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
}

/**
 * Cập nhật organization
 */
export async function updateOrganization(id: number, data: Partial<OrganizationItem>): Promise<OrganizationItem | null> {
  try {
    const response = await OrganizationModel.update(id, data);
    if (response) {
      return convertApiToOrganizationItem(response);
    }
    return null;
  } catch (error) {
    console.error('Error updating organization:', error);
    throw error;
  }
}

/**
 * Xóa organization
 */
export async function deleteOrganization(id: number): Promise<boolean> {
  try {
    await OrganizationModel.delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting organization:', error);
    throw error;
  }
}

// Sync functions for backward compatibility (use mock data)
export function getOrganizationById(id: number): OrganizationItem | undefined {
  return mockOrganizations.find(o => o.id === id);
}

export function getActiveOrganizations(): OrganizationItem[] {
  return mockOrganizations.filter(o => o.status === 'active');
}

export function getOrganizationsByProvince(provinceCode: number): OrganizationItem[] {
  return mockOrganizations.filter(o => o.provinceCode === provinceCode);
}

// Backward compatibility aliases (for facilities)
export const getFacilityById = getOrganizationById;
export const getActiveFacilities = getActiveOrganizations;
export const getFacilitiesByProvince = getOrganizationsByProvince;

// Export mock data
export { mockOrganizations, mockOrganizations as mockFacilities };
