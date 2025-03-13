// API base URL - update this to your backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch users");
    }

    return data;
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }

    return data;
  } catch (error) {
    console.error("Get products error:", error);
    throw error;
  }
};

export const addProduct = async (
  nama: string,
  stok: number,
  link_gambar?: string
): Promise<void> => {
  try {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/produk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
      body: JSON.stringify({ nama, stok, link_gambar }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add product");
    }

    return data;
  } catch (error) {
    console.error("Add product error:", error);
    throw error;
  }
};
