
import { CampingZone, Reservation } from '../types';

export const mockCampingZones: CampingZone[] = [
  {
    id: '1',
    name: 'ริมธาร',
    description: 'โซนแคมป์ปิ้งริมธารน้ำใส บรรยากาศเงียบสงบ เหมาะสำหรับครอบครัว',
    capacity: 6,
    pricePerNight: 800,
    amenities: ['ห้องน้ำ', 'จุดล้างจาน', 'ไฟฟ้า', 'ที่จอดรถ'],
    images: [
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800',
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800'
    ],
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'ป่าไผ่',
    description: 'โซนแคมป์ปิ้งท่ามกลางป่าไผ่เขียวชอุ่ม อากาศเย็นสบาย',
    capacity: 4,
    pricePerNight: 600,
    amenities: ['ห้องน้ำ', 'ไฟฟ้า', 'ที่จอดรถ'],
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800'
    ],
    isActive: true,
    createdAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    name: 'ยอดดอย',
    description: 'โซนแคมป์ปิ้งบนยอดเขา วิวพระอาทิตย์ขึ้นสวยงาม',
    capacity: 8,
    pricePerNight: 1200,
    amenities: ['ห้องน้ำ', 'จุดล้างจาน', 'ไฟฟ้า', 'ที่จอดรถ', 'จุดชมวิว'],
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800'
    ],
    isActive: true,
    createdAt: '2024-01-05T09:15:00Z'
  }
];

export const mockReservations: Reservation[] = [
  {
    id: 'R001',
    zoneName: 'ริมธาร',
    spotName: 'จุด A1',
    checkIn: '2024-02-15',
    checkOut: '2024-02-17',
    guests: 4,
    status: 'confirmed',
    total: 1600,
    paymentSlip: 'slip_001.jpg',
    customerName: 'สมชาย ใจดี',
    customerPhone: '081-234-5678',
    customerEmail: 'somchai@email.com',
    createdAt: '2024-02-01T10:30:00Z'
  },
  {
    id: 'R002',
    zoneName: 'ป่าไผ่',
    spotName: 'จุด B2',
    checkIn: '2024-02-20',
    checkOut: '2024-02-22',
    guests: 2,
    status: 'pending',
    total: 1200,
    paymentSlip: 'slip_002.jpg',
    customerName: 'วิไล สุขใส',
    customerPhone: '089-876-5432',
    customerEmail: 'wilai@email.com',
    createdAt: '2024-02-05T15:45:00Z'
  },
  {
    id: 'R003',
    zoneName: 'ยอดดอย',
    spotName: 'จุด C1',
    checkIn: '2024-02-25',
    checkOut: '2024-02-28',
    guests: 6,
    status: 'confirmed',
    total: 3600,
    paymentSlip: 'slip_003.jpg',
    customerName: 'ประยุทธ์ ท่องเที่ยว',
    customerPhone: '092-111-2233',
    customerEmail: 'prayuth@email.com',
    createdAt: '2024-02-10T08:20:00Z'
  },
  {
    id: 'R004',
    zoneName: 'ริมธาร',
    spotName: 'จุด A3',
    checkIn: '2024-03-01',
    checkOut: '2024-03-03',
    guests: 5,
    status: 'cancelled',
    total: 1600,
    customerName: 'สุนิสา แคมป์ปิ้ง',
    customerPhone: '084-555-7777',
    customerEmail: 'sunisa@email.com',
    createdAt: '2024-02-12T12:10:00Z'
  }
];
