
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Palette, 
  Star, 
  Trophy, 
  Sparkles, 
  Zap, 
  Rocket,
  Camera,
  Video,
  Pencil,
  Image as ImageIcon,
  Play,
  Film,
  Brush,
  Scissors
} from 'lucide-react';
import { registrationService } from '@/services/registrationService';
import styles from './Dashboard.module.css';

interface DashboardProps {
  onStartRegistration: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartRegistration }) => {
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  useEffect(() => {
    const fetchTotalRegistrations = async () => {
      const count = await registrationService.getTotalRegistrations();
      setTotalRegistrations(count);
    };

    fetchTotalRegistrations();
  }, []);

  const softwareIcons = [
    { icon: Camera, color: 'text-blue-500 bg-blue-100', name: 'Photoshop' },
    { icon: Video, color: 'text-purple-500 bg-purple-100', name: 'Premiere Pro' },
    { icon: Sparkles, color: 'text-yellow-500 bg-yellow-100', name: 'After Effects' },
    { icon: ImageIcon, color: 'text-green-500 bg-green-100', name: 'Lightroom' },
    { icon: Pencil, color: 'text-red-500 bg-red-100', name: 'Illustrator' },
    { icon: Brush, color: 'text-orange-500 bg-orange-100', name: 'Canva' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-2 sm:p-4">
      <div className="max-w-[1400px] mx-auto space-y-6 sm:space-y-8">
        {/* Hero Section with HSH Logo */}
        <div className="text-center space-y-6 sm:space-y-8 relative py-6 sm:py-8">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/30 via-purple-100/30 to-blue-100/30 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="relative w-[100vw] h-[100vw] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] xl:w-[800px] xl:h-[800px] flex items-center justify-center">
                {/* Main Logo Container with Background */}
                <div className="absolute inset-[20%] bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-xl flex items-center justify-center p-10 border-2 border-indigo-200">
                  {/* Main Logo */}
                  <img
                    src="/hsh.png"
                    alt="Hari-Saurabh Hostel"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Creative Minds Wanted
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-indigo-700/70 font-light">
              Where creativity meets community ✨
            </p>
          </div>
        </div>

        {/* Creative Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <Card className="col-span-1 border-0 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center p-4 sm:pb-2">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 opacity-90" />
              <CardTitle className="text-xl sm:text-3xl font-bold">{totalRegistrations}</CardTitle>
              <CardDescription className="text-indigo-100 text-sm sm:text-base">Active Creators</CardDescription>
            </CardHeader>
          </Card>

          <Card className="col-span-1 border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center p-4 sm:pb-2">
              <Trophy className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 opacity-90" />
              <CardTitle className="text-xl sm:text-3xl font-bold">4</CardTitle>
              <CardDescription className="text-purple-100 text-sm sm:text-base">Creative Teams</CardDescription>
            </CardHeader>
          </Card>

          <Card className="col-span-2 md:col-span-1 border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center p-4 sm:pb-2">
              <Star className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 opacity-90" />
              <CardTitle className="text-xl sm:text-3xl font-bold">8+</CardTitle>
              <CardDescription className="text-blue-100 text-sm sm:text-base">Skills Available</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main CTA Section */}
        <div className="relative mt-8 sm:mt-12">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
          <Card className="relative border-0 bg-white/80 backdrop-blur-sm shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>
            <CardHeader className="text-center space-y-4 sm:space-y-6 pt-8 sm:pt-12 pb-6 sm:pb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4">
                <Zap className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-500 animate-pulse mb-4 sm:mb-0" />
                <div>
                  <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Ready to Create?
                  </CardTitle>
                  <CardDescription className="text-lg sm:text-xl mt-2 sm:mt-3 text-muted-foreground">
                    Join our creative revolution today! 🎨
                  </CardDescription>
                </div>
                <Palette className="h-12 w-12 sm:h-16 sm:w-16 text-purple-500 animate-bounce mt-4 sm:mt-0" />
              </div>
            </CardHeader>

            <CardContent className="pb-8 sm:pb-12">
              <div className="flex justify-center">
                <Button
                  onClick={onStartRegistration}
                  size="lg"
                  className="w-full sm:w-auto text-lg h-12 sm:h-14 px-8 sm:px-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                  Start Your Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-xl sm:text-2xl">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-orange-600" />
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Creative Teams
                </span>
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Join Pavitra, Param, Pulkit, or Parmanand - each team brings unique creative energy! 🌟
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-xl sm:text-2xl">
                <Palette className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-teal-600" />
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Diverse Skills
                </span>
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                From video editing to photography, sketching to designing - unleash your creativity! 🎭
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};
