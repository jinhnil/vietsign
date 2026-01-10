// API Service cho dữ liệu địa chính Việt Nam
// Sử dụng API từ: https://provinces.open-api.vn/api/v2

const API_BASE_URL = "https://provinces.open-api.vn/api/v2";

// Types theo API response
export interface ApiProvince {
  name: string;
  code: number;
  division_type: "tỉnh" | "thành phố trung ương";
  codename: string;
  phone_code: number;
  wards?: ApiWard[];
}

export interface ApiWard {
  name: string;
  code: number;
  division_type: "xã" | "phường" | "thị trấn" | "đặc khu";
  codename: string;
  province_code: number;
}

// Local types (tương thích với cấu trúc cũ)
export interface Commune {
  id: string;
  name: string;
  type: "phường" | "xã" | "thị trấn" | "đặc khu";
}

export interface Province {
  id: string;
  name: string;
  type: "tỉnh" | "thành phố trung ương";
  code: string;
  communes: Commune[];
}

// Chuyển đổi từ API response sang local format
function convertApiProvinceToLocal(apiProvince: ApiProvince): Province {
  return {
    id: apiProvince.code.toString().padStart(2, "0"),
    name: apiProvince.name.replace(/^(Tỉnh |Thành phố )/, ""),
    type: apiProvince.division_type,
    code: apiProvince.codename.toUpperCase().slice(0, 2),
    communes: (apiProvince.wards || []).map((ward) => ({
      id: ward.code.toString(),
      name: ward.name.replace(/^(Phường |Xã |Thị trấn |Đặc khu )/, ""),
      type: ward.division_type,
    })),
  };
}

// Cache để giảm số lần gọi API
let provincesCache: Province[] | null = null;
let provinceDetailCache: Map<number, Province> = new Map();

/**
 * Lấy danh sách tất cả tỉnh/thành phố
 */
export async function fetchProvinces(): Promise<Province[]> {
  if (provincesCache) {
    return provincesCache;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/p/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiProvince[] = await response.json();
    provincesCache = data.map(convertApiProvinceToLocal);
    return provincesCache;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
}

/**
 * Lấy thông tin chi tiết của một tỉnh/thành phố (bao gồm danh sách phường/xã)
 */
export async function fetchProvinceById(
  code: number
): Promise<Province | null> {
  // Validate code
  if (!code || code <= 0) {
    return null;
  }

  // Check cache first
  if (provinceDetailCache.has(code)) {
    return provinceDetailCache.get(code)!;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/p/${code}?depth=2`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiProvince = await response.json();
    const province = convertApiProvinceToLocal(data);
    provinceDetailCache.set(code, province);
    return province;
  } catch (error) {
    console.error(`Error fetching province ${code}:`, error);
    throw error;
  }
}

/**
 * Lấy danh sách phường/xã theo tỉnh/thành phố
 */
export async function fetchWardsByProvince(
  provinceCode: number
): Promise<Commune[]> {
  if (!provinceCode || provinceCode <= 0) {
    return [];
  }
  try {
    const response = await fetch(`${API_BASE_URL}/w/?province=${provinceCode}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiWard[] = await response.json();
    return data.map((ward) => ({
      id: ward.code.toString(),
      name: ward.name.replace(/^(Phường |Xã |Thị trấn |Đặc khu )/, ""),
      type: ward.division_type,
    }));
  } catch (error) {
    console.error(`Error fetching wards for province ${provinceCode}:`, error);
    throw error;
  }
}

/**
 * Tìm kiếm tỉnh/thành phố theo tên
 */
export async function searchProvinces(query: string): Promise<Province[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/p/?search=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiProvince[] = await response.json();
    return data.map(convertApiProvinceToLocal);
  } catch (error) {
    console.error("Error searching provinces:", error);
    throw error;
  }
}

/**
 * Tìm kiếm phường/xã theo tên
 */
export async function searchWards(
  query: string,
  provinceCode?: number
): Promise<Commune[]> {
  try {
    let url = `${API_BASE_URL}/w/?search=${encodeURIComponent(query)}`;
    if (provinceCode) {
      url += `&province=${provinceCode}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiWard[] = await response.json();
    return data.map((ward) => ({
      id: ward.code.toString(),
      name: ward.name.replace(/^(Phường |Xã |Thị trấn |Đặc khu )/, ""),
      type: ward.division_type,
    }));
  } catch (error) {
    console.error("Error searching wards:", error);
    throw error;
  }
}

/**
 * Lấy tất cả dữ liệu (tỉnh + phường/xã) - Tương đương với việc load toàn bộ file static cũ
 * Lưu ý: Hàm này gọi nhiều API nên có thể chậm
 */
export async function fetchAllData(): Promise<Province[]> {
  try {
    // Lấy tất cả tỉnh với depth=2 để có luôn danh sách phường/xã
    const response = await fetch(`${API_BASE_URL}/?depth=2`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiProvince[] = await response.json();
    return data.map(convertApiProvinceToLocal);
  } catch (error) {
    console.error("Error fetching all data:", error);
    throw error;
  }
}

/**
 * Lấy thành phố trực thuộc trung ương
 */
export async function fetchCities(): Promise<Province[]> {
  const provinces = await fetchProvinces();
  return provinces.filter((p) => p.type === "thành phố trung ương");
}

/**
 * Lấy danh sách tỉnh (không bao gồm thành phố trực thuộc trung ương)
 */
export async function fetchProvincesOnly(): Promise<Province[]> {
  const provinces = await fetchProvinces();
  return provinces.filter((p) => p.type === "tỉnh");
}

/**
 * Xoá cache để lấy dữ liệu mới từ API
 */
export function clearCache(): void {
  provincesCache = null;
  provinceDetailCache.clear();
}

// Export các hàm helper để tương thích với code cũ
export {
  fetchProvinces as getProvinces,
  fetchProvinceById as getProvinceByCode,
  fetchWardsByProvince as getWardsByProvince,
  fetchCities as getCities,
  fetchProvincesOnly as getProvincesList,
};
