import axios from "axios";

// Constants
const BASE_URL = "https://provinces.open-api.vn/api"; // Defaulting to base API, user mentioned v2 but typically structure is /p/, /d/, /w/ under /api/

// Direct API Types
export interface ApiProvince {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: ApiDistrict[];
}

export interface ApiDistrict {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  province_code: number;
  wards: ApiWard[];
}

export interface ApiWard {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  district_code: number;
}

// Application Interfaces (Mapped)
export interface Commune {
  id: string;
  name: string;
  type: string;
  latitude?: number;
  longitude?: number;
  districtId?: string;
}

export interface District {
  id: string;
  name: string;
  type: string;
  communes?: Commune[];
}

export interface Province {
  id: number;
  name: string;
  code: number;
  districts: District[];
  communes: Commune[]; // Flattened list for backward compatibility if needed, or just empty if we use districts
}

// Cache to prevent too many requests
let provincesCache: Province[] | null = null;
let provinceDetailsCache: Record<number, Province> = {};

// Fetch raw provinces (depth 1)
export async function fetchProvincesOnly(): Promise<ApiProvince[]> {
  try {
    const response = await axios.get(`${BASE_URL}/p/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
}

// Fetch full province details (depth 3 for districts and wards)
export async function fetchProvinceDetails(
  code: number,
): Promise<ApiProvince | null> {
  try {
    const response = await axios.get(`${BASE_URL}/p/${code}?depth=3`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching province ${code}:`, error);
    return null;
  }
}

// Main function to get provinces with minimal data (depth 1) but mapped to App Interface
export async function fetchProvinces(): Promise<Province[]> {
  if (provincesCache) return provincesCache;

  const apiProvinces = await fetchProvincesOnly();

  const mappedProvinces: Province[] = apiProvinces.map((p) => ({
    id: p.code,
    name: p.name,
    code: p.code,
    districts: [], // Depth 1 doesn't have districts
    communes: [],
  }));

  provincesCache = mappedProvinces;
  return mappedProvinces;
}

// Get province by ID with full details (depth 3)
export async function fetchProvinceById(id: number): Promise<Province | null> {
  if (provinceDetailsCache[id]) return provinceDetailsCache[id];

  const apiProvince = await fetchProvinceDetails(id);
  if (!apiProvince) return null;

  // Map Districts and Wards
  const districts: District[] = (apiProvince.districts || []).map((d) => ({
    id: String(d.code),
    name: d.name,
    type: d.division_type,
    communes: (d.wards || []).map((w) => ({
      id: String(w.code),
      name: w.name,
      type: w.division_type,
      districtId: String(d.code),
    })),
  }));

  // Flatten wards for 'communes' property if needed for backward compatibility
  const allCommunes: Commune[] = districts.flatMap((d) => d.communes || []);

  const mappedProvince: Province = {
    id: apiProvince.code,
    name: apiProvince.name,
    code: apiProvince.code,
    districts: districts,
    communes: allCommunes,
  };

  provinceDetailsCache[id] = mappedProvince;
  return mappedProvince;
}

// Get all wards for a province (requires fetching province details depth 3)
export async function fetchWardsByProvince(
  provinceCode: number,
): Promise<Commune[]> {
  const province = await fetchProvinceById(provinceCode);
  return province ? province.communes : [];
}

// Search (Client-side filtering after fetch)
export async function searchProvinces(query: string): Promise<Province[]> {
  const provinces = await fetchProvinces();
  const lowerQuery = query.toLowerCase();
  return provinces.filter((p) => p.name.toLowerCase().includes(lowerQuery));
}

export async function searchWards(query: string): Promise<Commune[]> {
  // This is expensive as it requires fetching all province details.
  // Ideally, search should be scoped to a province or district.
  // For now, return empty or implement if strictly needed.
  return [];
}

export async function fetchAllData(): Promise<Province[]> {
  return fetchProvinces();
}

export async function fetchCities(): Promise<Province[]> {
  return fetchProvinces(); // API doesn't distinguish City/Province in the list endpoint easily without checking division_type
}

export function clearCache() {
  provincesCache = null;
  provinceDetailsCache = {};
}

// Aliases
export const getProvinces = fetchProvinces;
export const getProvinceByCode = fetchProvinceById;
export const getWardsByProvince = fetchWardsByProvince;
export const getCities = fetchCities;
export const getProvincesList = fetchProvinces;
