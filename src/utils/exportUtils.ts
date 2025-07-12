
interface RegistrationData {
  fullName: string;
  mobileNumber: string;
  roomNumber: string;
  groupName: string;
  interests: string[];
  software: string[];
}

export const exportToExcel = (data: RegistrationData[]) => {
  // Convert array data (interests and software) to comma-separated strings
  const csvData = data.map(row => ({
    'Full Name': row.fullName,
    'Mobile Number': row.mobileNumber,
    'Room Number': row.roomNumber,
    'Group Name': row.groupName,
    'Interests': row.interests.join(', '),
    'Software': row.software.join(', ')
  }));

  // Create CSV headers
  const headers = [
    'Full Name',
    'Mobile Number',
    'Room Number',
    'Group Name',
    'Interests',
    'Software'
  ];

  // Convert data to CSV format
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => 
      headers.map(header => {
        // Escape commas and quotes in the content
        const content = row[header as keyof typeof row].toString();
        const escapedContent = content.includes(',') || content.includes('"') 
          ? `"${content.replace(/"/g, '""')}"` 
          : content;
        return escapedContent;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `registrations_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
