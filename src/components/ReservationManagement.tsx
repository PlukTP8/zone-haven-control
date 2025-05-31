
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockReservations } from '../data/mockData';
import { Reservation, ReservationStatus } from '../types';
import ReservationDetails from './ReservationDetails';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.zoneName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const updateReservationStatus = (reservationId: string, newStatus: ReservationStatus) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === reservationId 
          ? { ...reservation, status: newStatus }
          : reservation
      )
    );
  };

  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">รอดำเนินการ</Badge>;
      case 'confirmed':
        return <Badge variant="default" className="bg-green-100 text-green-800">ยืนยันแล้ว</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">ยกเลิก</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price);
  };

  if (selectedReservation) {
    return (
      <ReservationDetails
        reservation={selectedReservation}
        onBack={() => setSelectedReservation(null)}
        onUpdateStatus={updateReservationStatus}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-green-800">จัดการการจอง</h2>
        <div className="text-sm text-gray-600">
          ทั้งหมด {filteredReservations.length} รายการ
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Input
                placeholder="ค้นหาด้วยชื่อลูกค้า, โซน, หรือรหัสการจอง..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="สถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกสถานะ</SelectItem>
                  <SelectItem value="pending">รอดำเนินการ</SelectItem>
                  <SelectItem value="confirmed">ยืนยันแล้ว</SelectItem>
                  <SelectItem value="cancelled">ยกเลิก</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">รหัสจอง</th>
                  <th className="text-left p-4 font-semibold">ลูกค้า</th>
                  <th className="text-left p-4 font-semibold">โซน/จุด</th>
                  <th className="text-left p-4 font-semibold">วันที่</th>
                  <th className="text-left p-4 font-semibold">คน</th>
                  <th className="text-left p-4 font-semibold">สถานะ</th>
                  <th className="text-left p-4 font-semibold">ราคารวม</th>
                  <th className="text-left p-4 font-semibold">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{reservation.id}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{reservation.customerName}</div>
                        <div className="text-sm text-gray-500">{reservation.customerPhone}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{reservation.zoneName}</div>
                        <div className="text-sm text-gray-500">{reservation.spotName}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="text-sm">เช็คอิน: {formatDate(reservation.checkIn)}</div>
                        <div className="text-sm">เช็คเอาท์: {formatDate(reservation.checkOut)}</div>
                      </div>
                    </td>
                    <td className="p-4 text-center">{reservation.guests}</td>
                    <td className="p-4">{getStatusBadge(reservation.status)}</td>
                    <td className="p-4 font-semibold text-green-700">
                      {formatPrice(reservation.total)}
                    </td>
                    <td className="p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedReservation(reservation)}
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        ดูรายละเอียด
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">ไม่พบข้อมูลการจองที่ตรงกับการค้นหา</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationManagement;
