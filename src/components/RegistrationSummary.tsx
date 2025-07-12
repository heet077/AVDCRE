
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, UserPlus, Download, RotateCcw } from 'lucide-react';

interface RegistrationData {
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

interface RegistrationSummaryProps {
  data: RegistrationData;
  onNewRegistration: () => void;
  onExportData: () => void;
}

export const RegistrationSummary: React.FC<RegistrationSummaryProps> = ({ 
  data, 
  onNewRegistration, 
  onExportData 
}) => {
  const firstName = data.fullName.split(' ')[0];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
          <CardTitle className="text-2xl text-green-600">Registration Successful!</CardTitle>
        </div>
        <CardDescription className="text-lg">
          Thank you for registering, {firstName}! 🎉
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">📝 Registration Summary</h3>
          
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-medium text-sm text-muted-foreground w-32">👤 Full Name:</span>
              <span className="font-medium">{data.fullName}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-medium text-sm text-muted-foreground w-32">📱 Mobile Number:</span>
              <span className="font-medium">{data.mobileNumber}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-medium text-sm text-muted-foreground w-32">🏠 Room Number:</span>
              <span className="font-medium">{data.roomNumber}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-medium text-sm text-muted-foreground w-32">🧑‍🤝‍🧑 Group Name:</span>
              <span className="font-medium">{data.groupName}</span>
            </div>
            
            <div className="space-y-2">
              <span className="font-medium text-sm text-muted-foreground">🎨 Interests:</span>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="font-medium text-sm text-muted-foreground">🛠️ Tools/Software Used:</span>
              <div className="flex flex-wrap gap-2">
                {data.software.map((tool, index) => (
                  <Badge key={index} variant="outline">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <p className="text-green-800 text-center">
            Your creative profile has been recorded successfully. We're excited to have you onboard 
            and can't wait to see your amazing work! 🙌
          </p>
          <p className="text-green-700 text-center mt-2 text-sm">
            You'll be contacted by the admin team if there are any upcoming projects or sessions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={onNewRegistration} className="flex-1">
            <UserPlus className="h-4 w-4 mr-2" />
            Register Another Member
          </Button>
          <Button onClick={onExportData} variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Export Data to Excel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
