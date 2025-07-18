
import { useState } from 'react';
import Navigation from '../components/Navigation';
import CampingZoneManagement from '../components/CampingZoneManagement';
import ReservationManagement from '../components/ReservationManagement';
import SystemSettings from '../components/SystemSettings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('zones');

  return (
    <div className="min-h-screen bg-green-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'zones' && <CampingZoneManagement />}
        {activeTab === 'reservations' && <ReservationManagement />}
        {activeTab === 'settings' && <SystemSettings />}
      </main>
    </div>
  );
};

export default Index;
