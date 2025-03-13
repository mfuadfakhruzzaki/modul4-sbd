// API base URL - update this to your backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export interface User {
  id: number;
  nama: string;
  email: string;
  created_at: string;
}

export interface Product {
  id_barang: number;
  nama: string;
  stok: number;
  link_gambar?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface ApiError {
  message: string;
}

// Helper method to get auth header
const getAuthHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  }
  return undefined;
};

// Helper to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();

  if (!response.ok) {
    // Throw error with message from API
    throw new Error(data.message || `Error: ${response.status}`);
  }

  return data as T;
};

// Authentication APIs
export const registerUser = async (
  nama: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama, email, password }),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return handleResponse<LoginResponse>(response);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// User APIs
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/auth/users`, {
      headers: {
        ...authHeader,
      },
    });

    return handleResponse<User[]>(response);
  } catch (error) {
    console.error("Get users error:", error);
    throw error;
  }
};

// Product APIs
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/produk`, {
      headers: {
        ...authHeader,
      },
    });

    return handleResponse<Product[]>(response);
  } catch (error) {
    console.error("Get products error:", error);
    throw error;
  }
};

export const addProduct = async (
  nama: string,
  stok: number,
  link_gambar: string | null
): Promise<void> => {
  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    console.log("Adding product:", { nama, stok, link_gambar });

    const response = await fetch(`${API_URL}/produk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
      body: JSON.stringify({
        nama,
        stok,
        link_gambar: link_gambar || null,
      }),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Add product error:", error);
    throw error;
  }
};
