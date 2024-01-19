import React, { useState } from 'react';
// import './upload.css'
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image',selectedFile)
      formData.append('file_path', selectedFile['name'])
      fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Upload successful:', data);
          // Handle success (e.g., update UI
          setUploadStatus('success')
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          // Handle error (e.g., show error message)
          setUploadStatus('error')
        });
    }
    
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus === 'success' && <p>Successfully uploaded</p>}
      {uploadStatus === 'error' && <p>Upload failed</p>}
    </div>
  );
};

export default FileUpload;
