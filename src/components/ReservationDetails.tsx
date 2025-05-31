
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Reservation, ReservationStatus } from '../types';

interface ReservationDetailsProps {
  reservation: Reservation;
  onBack: () => void;
  onUpdateStatus: (reservationId: string, newStatus: ReservationStatus) => void;
}

const ReservationDetails = ({ reservation, onBack, onUpdateStatus }: ReservationDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price);
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

  const calculateNights = () => {
    const checkIn = new Date(reservation.checkIn);
    const checkOut = new Date(reservation.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← กลับ
          </Button>
          <h2 className="text-3xl font-bold text-green-800">รายละเอียดการจอง</h2>
        </div>
        <div className="text-right">
          <div className="text-lg font-mono">{reservation.id}</div>
          <div className="text-sm text-gray-500">
            จองเมื่อ: {formatDateTime(reservation.createdAt)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ข้อมูลหลัก */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                ข้อมูลการจอง
                {getStatusBadge(reservation.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">โซน</div>
                  <div className="text-lg font-semibold">{reservation.zoneName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">จุดเต๊นท์</div>
                  <div className="text-lg font-semibold">{reservation.spotName}</div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">วันเช็คอิน</div>
                  <div className="text-lg">{formatDate(reservation.checkIn)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">วันเช็คเอาท์</div>
                  <div className="text-lg">{formatDate(reservation.checkOut)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">จำนวนคืน</div>
                  <div className="text-lg">{calculateNights()} คืน</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">จำนวนคน</div>
                  <div className="text-lg">{reservation.guests} คน</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลลูกค้า</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500">ชื่อ-นามสกุล</div>
                <div className="text-lg font-semibold">{reservation.customerName}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">เบอร์โทรศัพท์</div>
                  <div className="text-lg">{reservation.customerPhone}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">อีเมล</div>
                  <div className="text-lg">{reservation.customerEmail}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ข้อมูลด้านขวา */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>จัดการสถานะ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">สถานะปัจจุบัน</div>
                {getStatusBadge(reservation.status)}
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">เปลี่ยนสถานะ</div>
                <Select
                  value={reservation.status}
                  onValueChange={(value: ReservationStatus) => 
                    onUpdateStatus(reservation.id, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">รอดำเนินการ</SelectItem>
                    <SelectItem value="confirmed">ยืนยันแล้ว</SelectItem>
                    <SelectItem value="cancelled">ยกเลิก</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>สรุปค่าใช้จ่าย</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{calculateNights()} คืน</span>
                  <span>{formatPrice(reservation.total)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>ยอดรวม</span>
                  <span className="text-green-700">{formatPrice(reservation.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {reservation.paymentSlip && (
            <Card>
              <CardHeader>
                <CardTitle>สลิปการโอนเงิน</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // ในระบบจริงจะเปิดรูปภาพสลิป
                    alert(`ดูสลิป: ${reservation.paymentSlip}`);
                  }}
                >
                  ดูสลิปการโอน
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
