// FIX: Define all necessary types for the application to resolve module errors.

export enum View {
  DASHBOARD = 'Dashboard',
  SOIL_MONITOR = 'Soil Monitor',
  SEED_LIBRARY = 'Seed Library',
  MARKETPLACE = 'Marketplace',
  ADMIN_PANEL = 'Admin Panel',
}

export enum UserRole {
  CLIENT = 'Client',
  ADMIN = 'Admin',
  SUPER_ADMIN = 'Super Admin',
}

export interface Seed {
  id: number;
  name: string;
  description: string;
  optimal_ph: string;
  optimal_moisture: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  farmer: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Farmer {
  id: string;
  name: string;
  contact: string;
  productIds: number[];
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  items: CartItem[];
}

export interface SoilData {
  fertility: string;
  ph: number;
  moisture: number;
}

export interface HistoricalSoilEntry extends SoilData {
  day: string;
}

export interface AIRecommendation {
    name: string;
    match_score: number;
    reason: string;
}

export interface User {
    uid: string;
    email: string | null;
    role: UserRole;
}
