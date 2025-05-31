
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCampingZones } from '../data/mockData';
import { CampingZone } from '../types';
import CampingZoneForm from './CampingZoneForm';
import { Edit, Trash2 } from 'lucide-react';

const CampingZoneManagement = () => {
  const [zones, setZones] = useState<CampingZone[]>(mockCampingZones);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<CampingZone | null>(null);

  const handleAddZone = () => {
    setEditingZone(null);
    setIsFormOpen(true);
  };

  const handleEditZone = (zone: CampingZone) => {
    setEditingZone(zone);
    setIsFormOpen(true);
  };

  const handleDeleteZone = (zoneId: string) => {
    if (confirm('คุณต้องการลบโซนนี้หรือไม่?')) {
      setZones(zones.filter(zone => zone.id !== zoneId));
    }
  };

  const handleSaveZone = (zoneData: Partial<CampingZone>) => {
    if (editingZone) {
      // Update existing zone
      setZones(zones.map(zone => 
        zone.id === editingZone.id 
          ? { ...zone, ...zoneData }
          : zone
      ));
    } else {
      // Add new zone
      const newZone: CampingZone = {
        id: `zone_${Date.now()}`,
        ...zoneData,
        isActive: true,
        createdAt: new Date().toISOString()
      } as CampingZone;
      setZones([...zones, newZone]);
    }
    setIsFormOpen(false);
    setEditingZone(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price);
  };

  if (isFormOpen) {
    return (
      <CampingZoneForm
        zone={editingZone}
        onSave={handleSaveZone}
        onCancel={() => {
          setIsFormOpen(false);
          setEditingZone(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-green-800">จัดการโซนแคมป์ปิ้ง</h2>
        <Button 
          onClick={handleAddZone}
          className="bg-green-600 hover:bg-green-700"
        >
          เพิ่มโซนใหม่
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone) => (
          <Card key={zone.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={zone.images[0] || 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800'}
                alt={zone.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl text-green-800">{zone.name}</CardTitle>
                <Badge variant={zone.isActive ? "default" : "secondary"} className={zone.isActive ? "bg-green-100 text-green-800" : ""}>
                  {zone.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm line-clamp-2">{zone.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-green-700">
                  {formatPrice(zone.pricePerNight)}/คืน
                </span>
                <span className="text-sm text-gray-500">
                  ความจุ: {zone.capacity} คน
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {zone.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {zone.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{zone.amenities.length - 3} อื่นๆ
                  </Badge>
                )}
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditZone(zone)}
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  แก้ไข
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteZone(zone.id)}
                  className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  ลบ
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {zones.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500 text-lg">ยังไม่มีโซนแคมป์ปิ้ง</p>
          <Button 
            onClick={handleAddZone}
            className="mt-4 bg-green-600 hover:bg-green-700"
          >
            เพิ่มโซนแรก
          </Button>
        </Card>
      )}
    </div>
  );
};

export default CampingZoneManagement;
