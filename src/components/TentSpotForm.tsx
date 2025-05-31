
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TentSpot, TentSize } from '../types';

interface TentSpotFormProps {
  spot: TentSpot | null;
  tentSizes: TentSize[];
  onSave: (spotData: Partial<TentSpot>) => void;
  onCancel: () => void;
}

const TentSpotForm = ({ spot, tentSizes, onSave, onCancel }: TentSpotFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    size: null as TentSize | null,
    capacity: 1,
    pricePerNight: 0,
    isActive: true
  });

  useEffect(() => {
    if (spot) {
      setFormData({
        name: spot.name,
        size: spot.size,
        capacity: spot.capacity,
        pricePerNight: spot.pricePerNight,
        isActive: spot.isActive
      });
    }
  }, [spot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.size) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    onSave({
      name: formData.name,
      size: formData.size,
      capacity: formData.capacity,
      pricePerNight: formData.pricePerNight,
      isActive: formData.isActive
    });
  };

  const handleSizeChange = (sizeId: string) => {
    const selectedSize = tentSizes.find(s => s.id === sizeId);
    if (selectedSize) {
      setFormData(prev => ({
        ...prev,
        size: selectedSize,
        capacity: selectedSize.minCapacity,
        pricePerNight: selectedSize.basePrice
      }));
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-xl text-green-800">
          {spot ? 'แก้ไขจุดกางเต๊นท์' : 'เพิ่มจุดกางเต๊นท์ใหม่'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">ชื่อจุด *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="เช่น A1, B2"
              required
            />
          </div>

          <div>
            <Label htmlFor="size">ขนาดเต๊นท์ *</Label>
            <Select value={formData.size?.id || ''} onValueChange={handleSizeChange}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกขนาดเต๊นท์" />
              </SelectTrigger>
              <SelectContent>
                {tentSizes.map((size) => (
                  <SelectItem key={size.id} value={size.id}>
                    {size.displayName} ({size.minCapacity}-{size.maxCapacity} คน)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="capacity">ความจุ (คน) *</Label>
            <Input
              id="capacity"
              type="number"
              min={formData.size?.minCapacity || 1}
              max={formData.size?.maxCapacity || 10}
              value={formData.capacity}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 1 }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="price">ราคาต่อคืน (บาท) *</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={formData.pricePerNight}
              onChange={(e) => setFormData(prev => ({ ...prev, pricePerNight: parseInt(e.target.value) || 0 }))}
              required
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 flex-1">
              {spot ? 'บันทึก' : 'เพิ่มจุด'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              ยกเลิก
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TentSpotForm;
