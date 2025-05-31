
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
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';
