
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import StatusControl, { SystemStatus } from './StatusControl';

interface SystemSettings {
  zonesManagement: SystemStatus;
  reservationManagement: SystemStatus;
  tentSpotManagement: SystemStatus;
  paymentSystem: SystemStatus;
  userRegistration: SystemStatus;
}

const SystemSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SystemSettings>({
    zonesManagement: 'active',
    reservationManagement: 'active',
    tentSpotManagement: 'active',
    paymentSystem: 'maintenance',
    userRegistration: 'active'
  });

  const handleStatusChange = (key: keyof SystemSettings, status: SystemStatus) => {
    setSettings(prev => ({
      ...prev,
      [key]: status
    }));
  };

  const handleSaveSettings = () => {
    // บันทึกการตั้งค่า (ในความเป็นจริงจะส่งไป API)
    localStorage.setItem('systemSettings', JSON.stringify(settings));
    toast({
      title: "บันทึกสำเร็จ",
      description: "การตั้งค่าสถานะระบบได้รับการบันทึกแล้ว",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-green-800 mb-2">การตั้งค่าระบบ</h1>
        <p className="text-gray-600">จัดการสถานะการทำงานของระบบต่างๆ</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-800">สถานะระบบหลัก</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <StatusControl
            label="ระบบจัดการโซนแคมป์ปิ้ง"
            status={settings.zonesManagement}
            onStatusChange={(status) => handleStatusChange('zonesManagement', status)}
          />
          
          <StatusControl
            label="ระบบจัดการการจอง"
            status={settings.reservationManagement}
            onStatusChange={(status) => handleStatusChange('reservationManagement', status)}
          />
          
          <StatusControl
            label="ระบบจัดการจุดกางเต๊นท์"
            status={settings.tentSpotManagement}
            onStatusChange={(status) => handleStatusChange('tentSpotManagement', status)}
          />
          
          <StatusControl
            label="ระบบชำระเงิน"
            status={settings.paymentSystem}
            onStatusChange={(status) => handleStatusChange('paymentSystem', status)}
          />
          
          <StatusControl
            label="ระบบลงทะเบียนผู้ใช้"
            status={settings.userRegistration}
            onStatusChange={(status) => handleStatusChange('userRegistration', status)}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          className="bg-green-600 hover:bg-green-700"
        >
          บันทึกการตั้งค่า
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;
