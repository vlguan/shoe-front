import React, { useState } from 'react';
import './upload.css'
function Upload(){
  const [selectedFiles, setSelectFiles] = useState([]);

  const handleFileChange = (event) => {
    const chosenFiles = Array.prototype.slice.call(event.target.files)
    setSelectFiles(chosenFiles);
  };

  const handleUpload = () => {
    selectedFiles.forEach((file)=> {
      const formData = new FormData();
      formData.append('image',file)
      formData.append('file_path', file['name'])
      fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          console.log(response)
          if(response.status === 200){
            console.log('Success')
          }else{
            console.log('Error')
          }
        })
    })
  };

    return(
      <div>
        <form>
            <div><h2>Upload Images</h2></div>
            <h3>Images</h3>
            <input type='file' multiple onChange={handleFileChange}/>
            <button type='button' onClick={handleUpload}>Upload</button>
        </form>
      </div>
        
      );
};

export default Upload;
