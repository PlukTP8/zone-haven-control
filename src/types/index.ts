
export interface CampingZone {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerNight: number;
  amenities: string[];
  images: string[];
  isActive: boolean;
  createdAt: string;
  tentSpots: TentSpot[];
}

export interface TentSpot {
  id: string;
  name: string;
  size: TentSize;
  capacity: number;
  pricePerNight: number;
  isActive: boolean;
  position?: { x: number; y: number }; // For future map positioning
}

export interface TentSize {
  id: string;
  name: string;
  displayName: string;
  minCapacity: number;
  maxCapacity: number;
  basePrice: number;
}

export interface Reservation {
  id: string;
  zoneName: string;
  spotName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  total: number;
  paymentSlip?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  createdAt: string;
  tentSpotId?: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';
