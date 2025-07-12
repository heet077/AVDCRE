
import React, { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { RegistrationModal } from '@/components/RegistrationModal';
import { RegistrationSummary } from '@/components/RegistrationSummary';
import { exportToExcel } from '@/utils/exportUtils';
import { toast } from '@/hooks/use-toast';

interface RegistrationData {
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  customInterest: string;
  software: string[];
  customSoftware: string;
}

const Index = () => {
  const [currentRegistration, setCurrentRegistration] = useState<RegistrationData | null>(null);
  const [allRegistrations, setAllRegistrations] = useState<RegistrationData[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartRegistration = () => {
    setIsModalOpen(true);
  };

  const handleRegistrationSubmit = (data: RegistrationData) => {
    setCurrentRegistration(data);
    setAllRegistrations(prev => [...prev, data]);
    setShowSummary(true);
    setIsModalOpen(false);
  };

  const handleNewRegistration = () => {
    setCurrentRegistration(null);
    setShowSummary(false);
  };

  const handleExportData = () => {
    if (allRegistrations.length === 0) {
      toast({ 
        title: "No data to export", 
        description: "Please register at least one member first.",
        variant: "destructive" 
      });
      return;
    }
    
    exportToExcel(allRegistrations);
    toast({ 
      title: "Data exported successfully! 📊", 
      description: `Exported ${allRegistrations.length} registration(s) to Excel.` 
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {!showSummary ? (
        <Dashboard 
          onStartRegistration={handleStartRegistration}
          totalRegistrations={allRegistrations.length}
        />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
          <div className="container mx-auto">
            {currentRegistration && (
              <RegistrationSummary
                data={currentRegistration}
                onNewRegistration={handleNewRegistration}
                onExportData={handleExportData}
              />
            )}
          </div>
        </div>
      )}

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleRegistrationSubmit}
      />
    </>
  );
};

export default Index;
