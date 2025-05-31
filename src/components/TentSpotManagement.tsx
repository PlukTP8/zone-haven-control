
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TentSpot, TentSize } from '../types';
import TentSpotForm from './TentSpotForm';
import { Edit, Trash2, Users, MapPin } from 'lucide-react';

interface TentSpotManagementProps {
  spots: TentSpot[];
  tentSizes: TentSize[];
  onSpotsChange: (spots: TentSpot[]) => void;
}

const TentSpotManagement = ({ spots, tentSizes, onSpotsChange }: TentSpotManagementProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState<TentSpot | null>(null);

  const handleAddSpot = () => {
    setEditingSpot(null);
    setIsFormOpen(true);
  };

  const handleEditSpot = (spot: TentSpot) => {
    setEditingSpot(spot);
    setIsFormOpen(true);
  };

  const handleDeleteSpot = (spotId: string) => {
    if (confirm('คุณต้องการลบจุดกางเต๊นท์นี้หรือไม่?')) {
      onSpotsChange(spots.filter(spot => spot.id !== spotId));
    }
  };

  const handleSaveSpot = (spotData: Partial<TentSpot>) => {
    if (editingSpot) {
      // Update existing spot
      const updatedSpots = spots.map(spot => 
        spot.id === editingSpot.id 
          ? { ...spot, ...spotData }
          : spot
      );
      onSpotsChange(updatedSpots);
    } else {
      // Add new spot
      const newSpot: TentSpot = {
        id: `spot_${Date.now()}`,
        ...spotData
      } as TentSpot;
      onSpotsChange([...spots, newSpot]);
    }
    setIsFormOpen(false);
    setEditingSpot(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price);
  };

  if (isFormOpen) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => {
            setIsFormOpen(false);
            setEditingSpot(null);
          }}
          className="mb-4"
        >
          ← กลับไปจุดกางเต๊นท์
        </Button>
        <TentSpotForm
          spot={editingSpot}
          tentSizes={tentSizes}
          onSave={handleSaveSpot}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingSpot(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-green-800">จุดกางเต๊นท์</h3>
        <Button 
          onClick={handleAddSpot}
          className="bg-green-600 hover:bg-green-700"
          size="sm"
        >
          เพิ่มจุดใหม่
        </Button>
      </div>

      {spots.length === 0 ? (
        <Card className="p-8 text-center border-dashed">
          <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">ยังไม่มีจุดกางเต๊นท์</p>
          <Button 
            onClick={handleAddSpot}
            className="bg-green-600 hover:bg-green-700"
          >
            เพิ่มจุดแรก
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spots.map((spot) => (
            <Card key={spot.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-green-800">{spot.name}</CardTitle>
                  <Badge variant={spot.isActive ? "default" : "secondary"} className={spot.isActive ? "bg-green-100 text-green-800" : ""}>
                    {spot.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {spot.size.displayName}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {spot.capacity} คน
                  </div>
                </div>
                
                <div className="text-lg font-semibold text-green-700">
                  {formatPrice(spot.pricePerNight)}/คืน
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditSpot(spot)}
                    className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    แก้ไข
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSpot(spot.id)}
                    className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    ลบ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TentSpotManagement;
