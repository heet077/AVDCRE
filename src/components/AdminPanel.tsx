
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { Users, Download, Trash2, TrendingUp, Award, Palette, Camera, Edit, Code, Brush, User, Phone, Home, UserCheck, Star, Trophy, Zap, Target, Loader2 } from 'lucide-react';

interface RegistrationData {
  id: string;
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

interface AdminPanelProps {
  registrations: RegistrationData[];
  onExportData: () => void;
  onClearData: () => void;
  onDeleteRegistration: (id: string) => void;
  isLoading: boolean;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  registrations, 
  onExportData, 
  onClearData,
  onDeleteRegistration,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto" />
          <p className="text-lg text-muted-foreground">Loading registrations...</p>
        </div>
      </div>
    );
  }

  // Data processing for charts
  const groupData = registrations.reduce((acc: any, reg) => {
    acc[reg.groupName] = (acc[reg.groupName] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(groupData).map(([name, value]) => ({
    name,
    value,
    count: value
  }));

  const interestsData = registrations
    .flatMap(reg => reg.interests)
    .reduce((acc: any, interest) => {
      acc[interest] = (acc[interest] || 0) + 1;
      return acc;
    }, {});

  const interestsChartData = Object.entries(interestsData)
    .map(([name, value]) => ({ name, value }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 8);

  const softwareData = registrations
    .flatMap(reg => reg.software)
    .reduce((acc: any, software) => {
      acc[software] = (acc[software] || 0) + 1;
      return acc;
    }, {});

  const softwareChartData = Object.entries(softwareData)
    .map(([name, value]) => ({ name, value }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 8);

  // Mock data for trends (you can replace with real time-based data)
  const trendData = [
    { day: 'Mon', registrations: 12 },
    { day: 'Tue', registrations: 19 },
    { day: 'Wed', registrations: 8 },
    { day: 'Thu', registrations: 15 },
    { day: 'Fri', registrations: 22 },
    { day: 'Sat', registrations: 18 },
    { day: 'Sun', registrations: 14 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <Trophy className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600 mr-2 sm:mr-3" />
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <Zap className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-500 ml-2 sm:ml-3 animate-pulse" />
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">
            Creative Community Analytics & Management ✨
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center p-4 sm:pb-2">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 opacity-90" />
              <CardTitle className="text-xl sm:text-3xl font-bold">{registrations.length}</CardTitle>
              <CardDescription className="text-purple-100 text-sm sm:text-base">Total Registrations</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center p-4 sm:pb-2">
              <Award className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 opacity-90" />
              <CardTitle className="text-xl sm:text-3xl font-bold">{Object.keys(groupData).length}</CardTitle>
              <CardDescription className="text-blue-100 text-sm sm:text-base">Active Groups</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center p-4 sm:pb-2">
              <Star className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 opacity-90" />
              <CardTitle className="text-xl sm:text-3xl font-bold">{Object.keys(interestsData).length}</CardTitle>
              <CardDescription className="text-green-100 text-sm sm:text-base">Unique Skills</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center p-4 sm:pb-2">
              <Target className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 opacity-90" />
              <CardTitle className="text-xl sm:text-3xl font-bold">{Object.keys(softwareData).length}</CardTitle>
              <CardDescription className="text-pink-100 text-sm sm:text-base">Software Tools</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Group Distribution Pie Chart */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-purple-600" />
                Group Distribution
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">Registration distribution across creative teams</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Registration Trends */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-green-600" />
                Registration Trends
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">Daily registration activity</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="registrations" 
                    stroke="#8884d8" 
                    fill="url(#colorGradient)" 
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Creative Interests */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Palette className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-pink-600" />
                Top Creative Interests
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">Most popular creative skills</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={interestsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Software Usage */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Code className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-600" />
                Software Usage
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">Most used creative software</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={softwareChartData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Actions Section */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-purple-600" />
              Admin Actions
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">Manage your registration data</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 sm:gap-4">
            <Button 
              onClick={onExportData}
              className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export to Excel
            </Button>
            <Button 
              onClick={onClearData}
              variant="destructive"
              className="flex-1 sm:flex-none"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
          </CardContent>
        </Card>

        {/* Recent Registrations */}
        {registrations.length > 0 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-green-600" />
                Recent Registrations
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">Latest members who joined the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                {registrations.slice(-10).reverse().map((registration, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="font-medium text-sm sm:text-base">{registration.fullName}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-xs sm:text-sm">{registration.mobileNumber}</span>
                      </div>
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2 text-purple-600" />
                        <span className="text-xs sm:text-sm">Room {registration.roomNumber}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-orange-600" />
                        <Badge variant="secondary" className="text-xs sm:text-sm">{registration.groupName}</Badge>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                      {(registration.interests || []).slice(0, 3).map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {registration.interests && registration.interests.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{registration.interests.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Registrations Table */}
        {registrations.length > 0 && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-indigo-600" />
                All Registrations
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">Complete registration data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-blue-50 text-left">
                      <th className="p-3 sm:p-4 border-b font-semibold text-gray-600 text-sm sm:text-base">#</th>
                      <th className="p-3 sm:p-4 border-b font-semibold text-gray-600 text-sm sm:text-base">Full Name</th>
                      <th className="p-3 sm:p-4 border-b font-semibold text-gray-600 text-sm sm:text-base">Mobile Number</th>
                      <th className="p-3 sm:p-4 border-b font-semibold text-gray-600 text-sm sm:text-base">Room Number</th>
                      <th className="p-3 sm:p-4 border-b font-semibold text-gray-600 text-sm sm:text-base">Group Name</th>
                      <th className="p-3 sm:p-4 border-b font-semibold text-gray-600 text-sm sm:text-base">Interests</th>
                      <th className="p-3 sm:p-4 border-b font-semibold text-gray-600 text-sm sm:text-base">Software</th>
                      <th className="p-3 sm:p-4 border-b font-semibold text-gray-600 text-sm sm:text-base">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration, index) => (
                      <tr key={registration.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 sm:p-4 border-b text-sm sm:text-base">{index + 1}</td>
                        <td className="p-3 sm:p-4 border-b font-medium text-sm sm:text-base">{registration.fullName}</td>
                        <td className="p-3 sm:p-4 border-b text-sm sm:text-base">{registration.mobileNumber}</td>
                        <td className="p-3 sm:p-4 border-b text-sm sm:text-base">{registration.roomNumber}</td>
                        <td className="p-3 sm:p-4 border-b">
                          <Badge variant="secondary" className="text-xs sm:text-sm">{registration.groupName}</Badge>
                        </td>
                        <td className="p-3 sm:p-4 border-b">
                          <div className="flex flex-wrap gap-1">
                            {(registration.interests || []).map((interest) => (
                              <Badge key={interest} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 border-b">
                          <div className="flex flex-wrap gap-1">
                            {(registration.software || []).map((sw) => (
                              <Badge key={sw} variant="outline" className="text-xs bg-blue-50">
                                {sw}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 border-b">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this registration?')) {
                                onDeleteRegistration(registration.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
