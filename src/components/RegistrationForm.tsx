
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Palette, ChevronLeft, ChevronRight, User, Phone, Home, UserCheck, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { registrationService } from '@/services/registrationService';
import { useConfetti } from '@/hooks/use-confetti';

interface RegistrationData {
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  wingCommanderName: string;
  interests: string[];
  customInterest: string;
  software: string[];
  customSoftware: string;
  stageVibes: string[];
  customStageVibe: string;
}

interface ValidationErrors {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobileNumber?: string;
  roomNumber?: string;
  groupName?: string;
  wingCommanderName?: string;
  interests?: string;
  software?: string;
  stageVibes?: string;
}

interface RegistrationFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const groupNames = ['Pavitra', 'Param', 'Pulkit', 'Parmanand'];

const creativeInterests = [
  'Video Editing',
  'Designing', 
  'Sketching',
  'Photography',
  'Video Shooting'
];

const softwareOptions = [
  'Adobe Premiere Pro',
  'After Effects',
  'Filmora',
  'CapCut',
  'VN',
  'Photoshop',
  'Canva',
  'Lightroom'
];

const steps = [
  { title: 'Personal Info', fields: ['firstName', 'middleName', 'lastName'], icon: User },
  { title: 'Contact', fields: ['mobileNumber'], icon: Phone },
  { title: 'Location', fields: ['roomNumber'], icon: Home },
  { title: 'Team', fields: ['groupName'], icon: Users },
  { title: 'Wing Commander', fields: ['wingCommanderName'], icon: UserCheck },
  { title: 'Skills', fields: ['interests', 'software'], icon: Palette },
  { title: 'Stage Vibes', fields: ['stageVibes'], icon: Palette }
];

const stageVibesOptions = [
  'singing',
  'acting',
  'mimicry',
  'instrumental/instruments',
  'dancing'
];

// Color palette for group selection
const groupColorMap: Record<string, string> = {
  Pavitra: 'bg-blue-600 border-blue-600',
  Param: 'bg-purple-600 border-purple-600',
  Pulkit: 'bg-green-600 border-green-600',
  Parmanand: 'bg-orange-500 border-orange-500',
};

const stageVibesColorMap: Record<string, string> = {
  singing: 'bg-blue-100 border-blue-400',
  acting: 'bg-purple-100 border-purple-400',
  mimicry: 'bg-green-100 border-green-400',
  'instrumental/instruments': 'bg-orange-100 border-orange-400',
  dancing: 'bg-pink-100 border-pink-400',
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { fireworks, schoolPride } = useConfetti();
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    roomNumber: '',
    groupName: '',
    wingCommanderName: '',
    interests: [],
    customInterest: '',
    software: [],
    customSoftware: '',
    stageVibes: [],
    customStageVibe: ''
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isCheckingMobile, setIsCheckingMobile] = useState(false);

  // Validation functions
  const validateFirstName = (name: string): string | undefined => {
    if (!name.trim()) return "First name is required";
    if (name.trim().length < 2) return "First name must be at least 2 characters long";
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "First name should only contain letters and spaces";
    return undefined;
  };

  const validateLastName = (name: string): string | undefined => {
    if (!name.trim()) return "Last name is required";
    if (name.trim().length < 2) return "Last name must be at least 2 characters long";
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Last name should only contain letters and spaces";
    return undefined;
  };

  const validateMobileNumber = (number: string): string | undefined => {
    if (!number.trim()) return "Mobile number is required";
    if (!/^[6-9]\d{9}$/.test(number.trim())) {
      return "Please enter a valid 10-digit Indian mobile number";
    }
    return undefined;
  };

  const validateRoomNumber = (room: string): string | undefined => {
    if (!room.trim()) return "Room number is required";
    if (!/^[A-Za-z0-9-]+$/.test(room.trim())) {
      return "Room number should only contain letters, numbers, and hyphens";
    }
    return undefined;
  };

  // Validation for Wing Commander Name
  const validateWingCommanderName = (name: string): string | undefined => {
    if (!name.trim()) return "Wing Commander name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters long";
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Name should only contain letters and spaces";
    return undefined;
  };

  // Validation for Middle Name (optional, but if filled, must be valid)
  const validateMiddleName = (name: string): string | undefined => {
    if (!name.trim()) return undefined;
    if (name.trim().length < 2) return "Middle name must be at least 2 characters long";
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Middle name should only contain letters and spaces";
    return undefined;
  };

  // Validation for Stage Vibes
  const validateStageVibes = (vibes: string[], custom: string): string | undefined => {
    if (vibes.length === 0 && !custom.trim()) {
      return 'Please select at least one stage vibe or specify other';
    }
    return undefined;
  };

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    setValidationErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleMultiSelect = (field: 'interests' | 'software', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const validateCurrentStep = async () => {
    const currentFields = steps[currentStep].fields;
    let errors: ValidationErrors = {};
    let isValid = true;

    for (const field of currentFields) {
      if (field === 'firstName') {
        const error = validateFirstName(formData.firstName);
        if (error) {
          errors.firstName = error;
          isValid = false;
        }
      }
      if (field === 'middleName') {
        const error = validateMiddleName(formData.middleName);
        if (error) {
          errors.middleName = error;
          isValid = false;
        }
      }
      if (field === 'lastName') {
        const error = validateLastName(formData.lastName);
        if (error) {
          errors.lastName = error;
          isValid = false;
        }
      }

      if (field === 'mobileNumber') {
        const error = validateMobileNumber(formData.mobileNumber);
        if (error) {
          errors.mobileNumber = error;
          isValid = false;
        } else {
          // Check for uniqueness only if format is valid
          setIsCheckingMobile(true);
          try {
            const exists = await registrationService.checkMobileNumberExists(formData.mobileNumber);
            if (exists) {
              errors.mobileNumber = "This mobile number is already registered";
              isValid = false;
            }
          } catch (error) {
            console.error('Error checking mobile number:', error);
            toast({ 
              title: "Error checking mobile number",
              description: "Please try again",
              variant: "destructive"
            });
            isValid = false;
          } finally {
            setIsCheckingMobile(false);
          }
        }
      }

      if (field === 'roomNumber') {
        const error = validateRoomNumber(formData.roomNumber);
        if (error) {
          errors.roomNumber = error;
          isValid = false;
        }
      }

      if (field === 'groupName' && !formData.groupName.trim()) {
        errors.groupName = "Please select your group";
        isValid = false;
      }

      if (field === 'wingCommanderName') {
        const error = validateWingCommanderName(formData.wingCommanderName);
        if (error) {
          errors.wingCommanderName = error;
          isValid = false;
        }
      }

      if (field === 'interests') {
        // No validation required; field is optional
      }

      if (field === 'software') {
        // No validation required; field is optional
      }

      if (field === 'stageVibes') {
        const error = validateStageVibes(formData.stageVibes, formData.customStageVibe);
        if (error) {
          errors.stageVibes = error;
          isValid = false;
        }
      }
    }

    setValidationErrors(errors);

    if (!isValid) {
      const firstError = Object.values(errors)[0];
      if (firstError) {
        toast({ 
          title: firstError,
          variant: "destructive"
        });
      }
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Send WhatsApp message using Fonnte API (for demo/testing only; not secure for production)
  const sendWhatsAppMessage = async (mobileNumber, firstName, interests, software, stageVibes) => {
    const creativityLink = 'https://chat.whatsapp.com/EuSy522xhYE8rJafygxljh';
    const stageVibeLink = 'https://chat.whatsapp.com/KXtY0adny1C8CIUFVYFZa4';
    const hasSkills = (interests && interests.length > 0) || (software && software.length > 0);
    const hasStageVibes = stageVibes && stageVibes.length > 0;
    let message = `Hello ${firstName}! 👋\n\nThank you for registering.`;
    if (hasSkills) {
      message += `\n\nCreativity Group: ${creativityLink}`;
    }
    if (hasStageVibes) {
      message += `\n\nStage Vibe Group: ${stageVibeLink}`;
    }
    if (!hasSkills && !hasStageVibes) {
      message += `\n\nYou can join our groups later from your dashboard.`;
    }
    // Format mobile number for WhatsApp (e.g., 91xxxxxxxxxx for India)
    const formattedMobile = mobileNumber.replace(/^0/, '91');
    try {
      await fetch('https://api.fonnte.com/send', {
        method: 'POST',
        headers: {
          'Authorization': 'cvmacgjM1k8hQFHmAE5A', // <-- Your real Fonnte API key
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          countryCode: '91',
          target: formattedMobile,
          message: message
        })
      });
    } catch (err) {
      console.error('Failed to send WhatsApp message:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('Starting form submission...');
      
      const finalData = {
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        roomNumber: formData.roomNumber.trim(),
        groupName: formData.groupName.trim(),
        wingCommanderName: formData.wingCommanderName.trim(),
        interests: formData.customInterest.trim() 
          ? [...formData.interests, formData.customInterest.trim()] 
          : formData.interests,
        customInterest: formData.customInterest.trim(),
        software: formData.customSoftware.trim() 
          ? [...formData.software, formData.customSoftware.trim()] 
          : formData.software,
        customSoftware: formData.customSoftware.trim(),
        stageVibes: formData.customStageVibe.trim()
          ? [...formData.stageVibes, formData.customStageVibe.trim()]
          : formData.stageVibes,
        customStageVibe: formData.customStageVibe.trim()
      };

      console.log('Submitting form data:', finalData);
      
      await registrationService.createRegistration(finalData);
      // Send WhatsApp message after successful registration
      await sendWhatsAppMessage(
        finalData.mobileNumber,
        finalData.firstName,
        finalData.interests,
        finalData.software,
        finalData.stageVibes
      );
      // Trigger both confetti animations for a grand celebration
      fireworks();
      setTimeout(schoolPride, 500);

      toast({ 
        title: "Registration submitted successfully! 🎉",
        variant: "default"
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({ 
        title: "Registration failed", 
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const renderProgressIndicator = () => {
    return (
      <div className="flex flex-col items-center justify-center mb-8 px-4 relative min-h-[400px]">
        {/* Vertical line connecting the dots, only between steps */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div key={index} className="flex items-center w-full mb-8 relative z-10">
              {/* Vertical line only if not last step */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0" />
              )}
              {/* Left side - Step Circle and Title */}
              <div className="flex-1 text-right pr-6">
                <span className={`text-sm font-medium transition-colors duration-300 
                  ${isCurrent ? 'text-primary font-semibold' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {step.title}
                </span>
              </div>
              {/* Center - Progress Dot */}
              <div className="flex-shrink-0 z-10">
                <div 
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500
                    ${isCompleted 
                      ? 'bg-green-500 border-green-500 text-white scale-110 shadow-lg shadow-green-200' 
                      : isCurrent 
                        ? 'bg-primary border-primary text-white scale-125 animate-pulse shadow-lg shadow-primary/50' 
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
              </div>
              {/* Right side - Description */}
              <div className="flex-1 pl-6">
                <span className={`text-xs transition-colors duration-300
                  ${isCurrent ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}
                >
                  {isCurrent ? 'Current Step' : isCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderPreviousData = () => {
    if (currentStep === 0) return null;

    return (
      <div className="mb-4 p-2.5 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <h4 className="text-[10px] md:text-xs font-medium text-muted-foreground mb-2 flex items-center">
          <UserCheck className="h-3 w-3 mr-1" />
          Your Information So Far:
        </h4>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] md:text-xs">
          {(formData.firstName || formData.middleName || formData.lastName) && (
            <div className="flex items-center">
              <User className="h-2.5 w-2.5 mr-1 text-blue-600 flex-shrink-0" />
              <span className="font-medium truncate">Name:</span>
              <span className="ml-1 text-blue-700 truncate">{formData.firstName} {formData.middleName} {formData.lastName}</span>
            </div>
          )}
          {formData.mobileNumber && (
            <div className="flex items-center">
              <Phone className="h-2.5 w-2.5 mr-1 text-green-600 flex-shrink-0" />
              <span className="font-medium truncate">Mobile:</span>
              <span className="ml-1 text-green-700 truncate">{formData.mobileNumber}</span>
            </div>
          )}
          {formData.roomNumber && (
            <div className="flex items-center">
              <Home className="h-2.5 w-2.5 mr-1 text-purple-600 flex-shrink-0" />
              <span className="font-medium truncate">Room:</span>
              <span className="ml-1 text-purple-700 truncate">{formData.roomNumber}</span>
            </div>
          )}
          {formData.groupName && (
            <div className="flex items-center">
              <Users className="h-2.5 w-2.5 mr-1 text-orange-600 flex-shrink-0" />
              <span className="font-medium truncate">Group:</span>
              <span className="ml-1 text-orange-700 truncate">{formData.groupName}</span>
            </div>
          )}
          {formData.wingCommanderName && (
            <div className="flex items-center">
              <UserCheck className="h-2.5 w-2.5 mr-1 text-pink-600 flex-shrink-0" />
              <span className="font-medium truncate">Wing Commander:</span>
              <span className="ml-1 text-pink-700 truncate">{formData.wingCommanderName}</span>
            </div>
          )}
          {formData.stageVibes && formData.stageVibes.length > 0 && (
            <div className="flex items-center">
              <Palette className="h-2.5 w-2.5 mr-1 text-yellow-600 flex-shrink-0" />
              <span className="font-medium truncate">Stage Vibes:</span>
              <span className="ml-1 text-yellow-700 truncate">
                {[...(formData.stageVibes || []), formData.customStageVibe].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    const StepIcon = steps[currentStep].icon;
    
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-8 w-8 md:h-12 md:w-12 text-blue-600 mx-auto mb-2" />
              <h3 className="text-base md:text-xl font-semibold">Let's start with your name</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Tell us who you are!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium">Your Name (First Name)</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`mt-1.5 h-10 md:h-11 text-base ${validationErrors.firstName ? 'border-red-500' : ''}`}
                />
                <p className="text-xs text-muted-foreground mt-1">Example: Taksh</p>
                {validationErrors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.firstName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="middleName" className="text-sm font-medium">Father's Name (Middle Name)</Label>
                <Input
                  id="middleName"
                  type="text"
                  placeholder="Enter your father's name"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  className={`mt-1.5 h-10 md:h-11 text-base ${validationErrors.middleName ? 'border-red-500' : ''}`}
                />
                <p className="text-xs text-muted-foreground mt-1">Example: Kantibhai</p>
                {validationErrors.middleName && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.middleName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium">Surname (Last Name)</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your surname"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`mt-1.5 h-10 md:h-11 text-base ${validationErrors.lastName ? 'border-red-500' : ''}`}
                />
                <p className="text-xs text-muted-foreground mt-1">Example: Asalaliya</p>
                {validationErrors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.lastName}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-8 w-8 md:h-12 md:w-12 text-green-600 mx-auto mb-2" />
              <h3 className="text-base md:text-xl font-semibold">How can we reach you?</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Your contact information</p>
            </div>
            <div>
              <Label htmlFor="mobileNumber" className="text-sm font-medium">Mobile Number</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="10-digit mobile number"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className={`mt-1.5 h-10 md:h-11 text-base ${validationErrors.mobileNumber ? 'border-red-500' : ''}`}
                disabled={isCheckingMobile}
              />
              <p className="text-xs text-muted-foreground mt-1">Example: 9876543210</p>
              {validationErrors.mobileNumber && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.mobileNumber}</p>
              )}
              {isCheckingMobile && (
                <p className="text-xs text-blue-500 mt-1">Checking mobile number...</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-8 w-8 md:h-12 md:w-12 text-orange-600 mx-auto mb-2" />
              <h3 className="text-base md:text-xl font-semibold">Where do you stay?</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Your room details</p>
            </div>
            <div>
              <Label htmlFor="roomNumber" className="text-sm font-medium">Room Number</Label>
              <Input
                id="roomNumber"
                type="text"
                placeholder="Enter your room number"
                value={formData.roomNumber}
                onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                className={`mt-1.5 h-10 md:h-11 text-base ${validationErrors.roomNumber ? 'border-red-500' : ''}`}
              />
              <p className="text-xs text-muted-foreground mt-1">Example:101</p>
              {validationErrors.roomNumber && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.roomNumber}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-8 w-8 md:h-12 md:w-12 text-purple-600 mx-auto mb-2" />
              <h3 className="text-base md:text-xl font-semibold">Choose your team</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Select your group name</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {groupNames.map((name) => (
                <div
                  key={name}
                  className={
                    `p-3 rounded-lg border-2 cursor-pointer transition-all duration-300
                    ${formData.groupName === name 
                      ? `${groupColorMap[name]} text-white shadow-lg scale-105` 
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`
                  }
                  onClick={() => handleInputChange('groupName', name)}
                >
                  <div className="flex items-center">
                    <Users className={`h-4 w-4 mr-2 ${formData.groupName === name ? 'text-white' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${formData.groupName === name ? 'text-white' : 'text-gray-700'}`}>
                      {name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-8 w-8 md:h-12 md:w-12 text-pink-600 mx-auto mb-2" />
              <h3 className="text-base md:text-xl font-semibold">Wing Commander Name</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Who is your wing commander?</p>
            </div>
            <div>
              <Label htmlFor="wingCommanderName" className="text-sm font-medium">Wing Commander Name</Label>
              <Input
                id="wingCommanderName"
                type="text"
                placeholder="Enter your wing commander name"
                value={formData.wingCommanderName}
                onChange={(e) => handleInputChange('wingCommanderName', e.target.value)}
                className={`mt-1.5 h-10 md:h-11 text-base ${validationErrors.wingCommanderName ? 'border-red-500' : ''}`}
              />
              <p className="text-xs text-muted-foreground mt-1">Example: Rajesh Kumar</p>
              {validationErrors.wingCommanderName && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.wingCommanderName}</p>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-8 w-8 md:h-12 md:w-12 text-pink-600 mx-auto mb-2" />
              <h3 className="text-base md:text-xl font-semibold">Show us your creative side</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">What are your skills and tools?</p>
            </div>
            {/* Creative Interests */}
            <div>
              <Label className="text-sm font-medium mb-3 block">🎨 Your Creative Interests</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {creativeInterests.map((interest) => (
                  <div 
                    key={interest} 
                    className={
                      `flex items-center space-x-2 p-2.5 rounded-lg transition-all duration-300
                      ${formData.interests.includes(interest) 
                        ? 'bg-primary/5 shadow-sm' 
                        : 'hover:bg-gray-50'
                      }`
                    }
                  >
                    <Checkbox
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={(checked) => 
                        handleMultiSelect('interests', interest, checked as boolean)
                      }
                      className="h-4 w-4"
                    />
                    <Label 
                      htmlFor={interest} 
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="customInterest" className="text-sm font-medium">Other (specify):</Label>
                <Input
                  id="customInterest"
                  type="text"
                  placeholder="Enter other creative interest"
                  value={formData.customInterest}
                  onChange={(e) => handleInputChange('customInterest', e.target.value)}
                  className="mt-1.5 h-10 md:h-11 text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">Example: Animation</p>
              </div>
              {(formData.interests.length > 0 || formData.customInterest) && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {formData.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {formData.customInterest && (
                    <Badge variant="secondary" className="text-xs">
                      {formData.customInterest}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            {/* Software/Applications */}
            <div>
              <Label className="text-sm font-medium mb-3 block">🛠️ Software/Applications You Use</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {softwareOptions.map((software) => (
                  <div 
                    key={software} 
                    className={
                      `flex items-center space-x-2 p-2.5 rounded-lg transition-all duration-300
                      ${formData.software.includes(software) 
                        ? 'bg-primary/5 shadow-sm' 
                        : 'hover:bg-gray-50'
                      }`
                    }
                  >
                    <Checkbox
                      id={software}
                      checked={formData.software.includes(software)}
                      onCheckedChange={(checked) => 
                        handleMultiSelect('software', software, checked as boolean)
                      }
                      className="h-4 w-4"
                    />
                    <Label 
                      htmlFor={software} 
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {software}
                    </Label>
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="customSoftware" className="text-sm font-medium">Other (specify):</Label>
                <Input
                  id="customSoftware"
                  type="text"
                  placeholder="Enter other software/application"
                  value={formData.customSoftware}
                  onChange={(e) => handleInputChange('customSoftware', e.target.value)}
                  className="mt-1.5 h-10 md:h-11 text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">Example: GIMP</p>
              </div>
              {(formData.software.length > 0 || formData.customSoftware) && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {formData.software.map((software) => (
                    <Badge key={software} variant="outline" className="text-xs">
                      {software}
                    </Badge>
                  ))}
                  {formData.customSoftware && (
                    <Badge variant="outline" className="text-xs">
                      {formData.customSoftware}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            {renderPreviousData()}
            <div className="text-center mb-6">
              <StepIcon className="h-8 w-8 md:h-12 md:w-12 text-yellow-600 mx-auto mb-2" />
              <h3 className="text-base md:text-xl font-semibold">Stage Vibes</h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">What are your stage talents?</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-3 block">🎤 Your Stage Vibes</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {stageVibesOptions.map((vibe) => {
                  const isSelected = formData.stageVibes.includes(vibe);
                  return (
                    <div
                      key={vibe}
                      className={`flex items-center space-x-2 p-2.5 rounded-lg border-2 transition-all duration-300
                        ${isSelected
                          ? `${stageVibesColorMap[vibe]} shadow-sm`
                          : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                        }`}
                    >
                      <Checkbox
                        id={vibe}
                        checked={isSelected}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            stageVibes: checked
                              ? [...prev.stageVibes, vibe]
                              : prev.stageVibes.filter((item) => item !== vibe),
                          }))
                        }
                        className="h-4 w-4"
                      />
                      <Label
                        htmlFor={vibe}
                        className="text-sm font-normal cursor-pointer flex-1 capitalize"
                      >
                        {vibe}
                      </Label>
                    </div>
                  );
                })}
              </div>
              <div>
                <Label htmlFor="customStageVibe" className="text-sm font-medium">Other (specify):</Label>
                <Input
                  id="customStageVibe"
                  type="text"
                  placeholder="Enter other stage vibe"
                  value={formData.customStageVibe}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customStageVibe: e.target.value }))}
                  className="mt-1.5 h-10 md:h-11 text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">Example: Stand-up comedy</p>
              </div>
              {(formData.stageVibes.length > 0 || formData.customStageVibe) && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {formData.stageVibes.map((vibe) => (
                    <Badge key={vibe} variant="secondary" className="text-xs capitalize">
                      {vibe}
                    </Badge>
                  ))}
                  {formData.customStageVibe && (
                    <Badge variant="secondary" className="text-xs">
                      {formData.customStageVibe}
                    </Badge>
                  )}
                </div>
              )}
              {validationErrors.stageVibes && (
                <p className="text-xs text-red-500 mt-1">{validationErrors.stageVibes}</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto min-h-[100vh] md:h-[calc(100vh-2rem)] md:max-h-[90vh] overflow-hidden bg-white">
      <div className="flex flex-col md:grid md:grid-cols-[300px_1fr] h-full">
        {/* Progress Indicator - Horizontal on mobile, Vertical on desktop */}
        <div className="bg-gradient-to-r md:bg-gradient-to-b from-purple-50 to-blue-50 py-3 px-4 md:p-6 md:border-r border-b md:border-b-0 flex-shrink-0">
          <div className="flex items-center justify-between md:justify-center mb-2 md:mb-6">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              Progress
            </h3>
            <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* Mobile Progress Indicator */}
          <div className="block md:hidden">
            <div className="flex items-center justify-between px-2 gap-2">
              {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className={`
                        w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 mb-1
                        ${isCompleted 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : isCurrent 
                            ? 'bg-primary border-primary text-white animate-pulse' 
                            : 'bg-gray-100 border-gray-300 text-gray-400'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <step.icon className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <span className={`text-[10px] font-medium text-center leading-tight
                      ${isCurrent ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Progress Indicator */}
          <div className="hidden md:block">
            {renderProgressIndicator()}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex flex-col flex-1 relative min-h-0">
          <CardHeader className="text-center py-3 px-4 md:p-6 border-b flex-shrink-0">
            <div className="flex items-center justify-center">
              <Palette className="h-5 w-5 md:h-8 md:w-8 text-primary mr-2" />
              <CardTitle className="text-lg md:text-2xl">Creative Community Registration</CardTitle>
            </div>
          </CardHeader>

          {/* pb-40 ensures content is not hidden behind the fixed button bar on desktop */}
          <CardContent className="flex-1 overflow-y-auto p-4 md:p-6 md:pb-40">
            <div className="max-w-full">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons - Inside CardContent for mobile */}
            <div className="flex items-center justify-between mt-8 gap-4 border-t pt-4 md:hidden">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex-1 h-12 px-3 text-sm"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Previous</span>
              </Button>
              
              <Button 
                type="button" 
                onClick={handleNext}
                className="flex-1 h-12 px-3 text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <span>Submit</span>
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>

          {/* Navigation Buttons - Fixed at bottom for desktop */}
          <div className="hidden md:flex items-center justify-between p-4 px-6 border-t bg-white absolute bottom-0 left-0 right-0 z-10 gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex-1 h-12 px-4 text-sm"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Previous</span>
            </Button>
            
            <Button 
              type="button" 
              onClick={handleNext}
              className="flex-1 h-12 px-4 text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <span>Submit</span>
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
