// Defines interfaces
export interface Commune {
  id: string;
  name: string;
  type: string;
  latitude?: number;
  longitude?: number;
}

export interface Province {
  id: number;
  name: string;
  code: number;
  districts: any[];
  communes: Commune[]; // For backward compatibility flattened list or structure
}

// API Types for Open API
export interface ApiProvince {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: any[];
}

export interface ApiWard {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  district_code: number;
}

// Mock Data for now
const mockProvinces: Province[] = [
  {
    id: 1,
    name: "Hà Nội",
    code: 1,
    districts: [],
    communes: [{ id: "00001", name: "Phường Phúc Xá", type: "phường" }],
  },
  {
    id: 79,
    name: "Hồ Chí Minh",
    code: 79,
    districts: [],
    communes: [],
  },
];

export async function fetchProvinces(): Promise<Province[]> {
  return mockProvinces;
}

export async function fetchProvinceById(id: number): Promise<Province | null> {
  return mockProvinces.find((p) => p.code === id) || null;
}

export async function fetchWardsByProvince(
  provinceCode: number,
): Promise<Commune[]> {
  const province = mockProvinces.find((p) => p.code === provinceCode);
  return province ? province.communes : [];
}

export async function searchProvinces(query: string): Promise<Province[]> {
  return mockProvinces.filter((p) => p.name.includes(query));
}

export async function searchWards(query: string): Promise<Commune[]> {
  return [];
}

export async function fetchAllData(): Promise<Province[]> {
  return mockProvinces;
}

export async function fetchCities(): Promise<Province[]> {
  return mockProvinces; // Simplified
}

export async function fetchProvincesOnly(): Promise<ApiProvince[]> {
  return mockProvinces.map((p) => ({
    code: p.code,
    name: p.name,
    division_type: "tỉnh/thành phố",
    codename: "hanoi",
    phone_code: 24,
    districts: [],
  }));
}

export function clearCache() {
  // No-op
}

// Aliases
export const getProvinces = fetchProvinces;
export const getProvinceByCode = fetchProvinceById;
export const getWardsByProvince = fetchWardsByProvince;
export const getCities = fetchCities;
export const getProvincesList = fetchProvinces;
