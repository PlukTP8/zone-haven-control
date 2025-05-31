
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CampingZone } from '../types';

interface CampingZoneFormProps {
  zone: CampingZone | null;
  onSave: (zoneData: Partial<CampingZone>) => void;
  onCancel: () => void;
}

const availableAmenities = [
  'ห้องน้ำ', 'จุดล้างจาน', 'ไฟฟ้า', 'ที่จอดรถ', 'จุดชมวิว', 
  'Wi-Fi', 'ร้านขายของ', 'เช่าอุปกรณ์', 'กิจกรรมกลางแจ้ง'
];

const CampingZoneForm = ({ zone, onSave, onCancel }: CampingZoneFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: 1,
    pricePerNight: 0,
    amenities: [] as string[],
    images: [] as string[]
  });

  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    if (zone) {
      setFormData({
        name: zone.name,
        description: zone.description,
        capacity: zone.capacity,
        pricePerNight: zone.pricePerNight,
        amenities: [...zone.amenities],
        images: [...zone.images]
      });
    }
  }, [zone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('กรุณากรอกชื่อโซน');
      return;
    }
    onSave(formData);
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        amenities: prev.amenities.filter(a => a !== amenity)
      }));
    }
  };

  const addImage = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...formData.images];
    if (direction === 'up' && index > 0) {
      [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    } else if (direction === 'down' && index < newImages.length - 1) {
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    }
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">
            {zone ? 'แก้ไขโซนแคมป์ปิ้ง' : 'เพิ่มโซนแคมป์ปิ้งใหม่'}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">ชื่อโซน *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="เช่น ริมธาร"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="capacity">ความจุ (คน) *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
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
              </div>

              <div>
                <Label htmlFor="description">รายละเอียดโซน</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="อธิบายลักษณะของโซน บรรยากาศ และสิ่งที่น่าสนใจ"
                  rows={6}
                />
              </div>
            </div>

            <div>
              <Label>สิ่งอำนวยความสะดวก</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {availableAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                    />
                    <Label htmlFor={amenity} className="text-sm cursor-pointer">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>รูปภาพโซน</Label>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="URL รูปภาพ"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addImage} variant="outline">
                    เพิ่มรูป
                  </Button>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`รูปที่ ${index + 1}`}
                          className="w-full h-24 object-cover rounded border"
                        />
                        <div className="absolute top-1 right-1 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {index > 0 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              onClick={() => moveImage(index, 'up')}
                              className="w-6 h-6 p-0"
                            >
                              ↑
                            </Button>
                          )}
                          {index < formData.images.length - 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              onClick={() => moveImage(index, 'down')}
                              className="w-6 h-6 p-0"
                            >
                              ↓
                            </Button>
                          )}
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => removeImage(index)}
                            className="w-6 h-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                        <Badge className="absolute bottom-1 left-1 text-xs">
                          {index + 1}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {zone ? 'บันทึกการแก้ไข' : 'เพิ่มโซน'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                ยกเลิก
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampingZoneForm;
