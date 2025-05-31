
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  return (
    <nav className="bg-white shadow-md border-b border-green-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-green-800">🏕️ Camp Admin</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Back Office
            </Badge>
          </div>
          
          <div className="flex space-x-4">
            <Button
              variant={activeTab === 'zones' ? 'default' : 'outline'}
              onClick={() => setActiveTab('zones')}
              className={activeTab === 'zones' ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}
            >
              จัดการโซนแคมป์ปิ้ง
            </Button>
            <Button
              variant={activeTab === 'reservations' ? 'default' : 'outline'}
              onClick={() => setActiveTab('reservations')}
              className={activeTab === 'reservations' ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}
            >
              จัดการการจอง
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
