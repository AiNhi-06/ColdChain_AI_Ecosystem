export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Device {
  id: string;
  name: string;
  serialNumber: string;
  status: 'online' | 'offline' | 'maintenance';
  location: string;
  lastReading?: TemperatureReading;
}

export interface TemperatureReading {
  deviceId: string;
  temperature: number;
  humidity: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  type: 'temperature' | 'humidity' | 'device';
  severity: 'critical' | 'warning' | 'info';
  message: string;
  deviceId: string;
  createdAt: string;
  acknowledged: boolean;
}

export interface Order {
  id: string;
  productName: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  temperature: TemperatureReading[];
  createdAt: string;
}