import React, { useState } from 'react';

interface CSVUploadProps {
  onCSVUpload: (data: Record<string, string>) => void;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onCSVUpload }) => {
  const [csvFile, setCSVFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setCSVFile(file);
  };

  const processCSV = async () => {
    if (csvFile) {
      try {
        const csvContent = await csvFile.text();
        const rows = csvContent.split('\n');

        // Assuming CSV has headers in the first row
        const headers = rows[0].split(',');

        // Map CSV data to an object
        const csvData: Record<string, string> = {};
        headers.forEach((header, index) => {
          csvData[header.trim()] = rows[1].split(',')[index].trim();
        });

        // Callback to parent component with CSV data
        onCSVUpload(csvData);
      } catch (error) {
        console.error('Error processing CSV:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleFileUpload}
      />
      <button onClick={processCSV}>Process CSV</button>
    </div>
  );
};

export default CSVUpload;
