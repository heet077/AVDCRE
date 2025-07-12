
import React, { useState, useEffect } from 'react';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminPanel } from '@/components/AdminPanel';
import { registrationService } from '@/services/registrationService';
import { toast } from '@/hooks/use-toast';
import { exportToExcel } from '@/utils/exportUtils';

interface RegistrationData {
  id: string;
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      const data = await registrationService.getAllRegistrations();
      
      // Transform the data to match the RegistrationData interface
      const transformedData = data.map(reg => ({
        id: reg.id,
        fullName: reg.full_name,
        mobileNumber: reg.mobile_number,
        roomNumber: reg.room_number,
        groupName: reg.group_name,
        interests: reg.interests,
        software: reg.software
      }));
      
      setRegistrations(transformedData);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast({
        title: "Failed to load registrations",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleExportData = () => {
    if (registrations.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no registrations to export.",
        variant: "destructive"
      });
      return;
    }

    try {
      exportToExcel(registrations);
      toast({
        title: "Export successful",
        description: `Exported ${registrations.length} registrations to CSV.`
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: "Export failed",
        description: "Failed to export registrations. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    try {
      await registrationService.deleteRegistration(id);
      await fetchRegistrations(); // Refresh the data
      toast({
        title: "Registration deleted",
        description: "The registration has been successfully deleted."
      });
    } catch (error) {
      console.error('Error deleting registration:', error);
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Failed to delete registration",
        variant: "destructive"
      });
    }
  };

  const handleClearData = async () => {
    if (registrations.length === 0) {
      toast({
        title: "No data to clear",
        description: "There are no registrations to delete.",
        variant: "destructive"
      });
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all registrations? This action cannot be undone."
    );

    if (confirmed) {
      try {
        await registrationService.deleteAllRegistrations();
        setRegistrations([]);
        toast({
          title: "All data cleared",
          description: "All registration data has been successfully deleted."
        });
      } catch (error) {
        console.error('Error clearing data:', error);
        toast({
          title: "Clear failed",
          description: error instanceof Error ? error.message : "Failed to clear registrations",
          variant: "destructive"
        });
      }
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <AdminPanel
          registrations={registrations}
          onExportData={handleExportData}
          onClearData={handleClearData}
          onDeleteRegistration={handleDeleteRegistration}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Admin;
