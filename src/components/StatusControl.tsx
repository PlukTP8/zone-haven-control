
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export type SystemStatus = 'active' | 'maintenance' | 'inactive';

interface StatusControlProps {
  label: string;
  status: SystemStatus;
  onStatusChange: (status: SystemStatus) => void;
}

const statusConfig = {
  active: {
    label: 'เปิดใช้งาน',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50'
  },
  maintenance: {
    label: 'สถานะปรับปรุง',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50'
  },
  inactive: {
    label: 'สถานะปิด',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50'
  }
};

const StatusControl = ({ label, status, onStatusChange }: StatusControlProps) => {
  const currentStatus = statusConfig[status];

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
      <div className="flex items-center space-x-3">
        <Label className="font-medium">{label}</Label>
        <Badge 
          variant="secondary" 
          className={`${currentStatus.bgColor} ${currentStatus.textColor} border-0`}
        >
          <div className={`w-2 h-2 rounded-full ${currentStatus.color} mr-2`}></div>
          {currentStatus.label}
        </Badge>
      </div>
      
      <Select value={status} onValueChange={(value: SystemStatus) => onStatusChange(value)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="เลือกสถานะ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              เปิดใช้งาน
            </div>
          </SelectItem>
          <SelectItem value="maintenance">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              สถานะปรับปรุง
            </div>
          </SelectItem>
          <SelectItem value="inactive">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              สถานะปิด
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusControl;
