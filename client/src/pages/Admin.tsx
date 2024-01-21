import React, { useState } from 'react';
import './admin.css';

const AdminDashboard = () => {
  const [itemData, setItemData] = useState({
    name: '',
    price: '',
    link: '',
    description: '',
    size: '',
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePaths, setFilePaths] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const chosenFiles = Array.prototype.slice.call(event.target.files);
    setSelectedFiles(chosenFiles);
    const paths = chosenFiles.map(file=>file.name).join(',');
    setFilePaths(paths);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine item information and images
    const formData = new FormData();

    // Append item information to form data
    formData.append('name', itemData.name);
    formData.append('price', itemData.price);
    formData.append('link', itemData.link);
    formData.append('description', itemData.description);
    formData.append('size', itemData.size);
    formData.append('image_files', JSON.stringify(filePaths));
    // Append files to form data
    selectedFiles.forEach((file)=> {
        const imageData = new FormData();
        imageData.append('image', file)
        imageData.append('file_path', file['name'])
        fetch('http://localhost:8000/api/upload/', {
          method: 'POST',
          body: imageData,
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
    fetch('http://localhost:8000/api/new-item/', {
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
  };

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-group-container'>
          <div className='input-group'>
            <label className="itemName">Item Name:</label>
              <input
                type="text"
                id="itemName"
                name="name"
                value={itemData.name}
                onChange={handleChange}
                required
              />
              </div>
              <div className='input-group'>
              <label className="itemPrice">Item Price:</label>
              <input
                type="text"
                id="itemPrice"
                name="price"
                value={itemData.price}
                onChange={handleChange}
                required
              />
              </div>
              <div className='input-group'>
              <label className="itemLink">IG Link:</label>
              <input
                type="text"
                id="itemLink"
                name="link"
                value={itemData.link}
                onChange={handleChange}
                required
              />
              </div>
              <div className='input-group'>
              <label className="itemSize">Size:</label>
              <input
                type="text"
                id="itemSize"
                name="size"
                value={itemData.size}
                onChange={handleChange}
                required
              />
              </div>
            </div>
        <div className='image-upload-container'>
          <label className="itemImages">Item Images:</label>
          <input
            type="file"
            id="itemImages"
            name="images"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div className='description-container'>
          <label className="itemDescription">Description:</label>
          <textarea
            id="itemDescription"
            name="description"
            value={itemData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        
      </form>
      <button type="submit">Submit</button>
    </div>
  );
};

export default AdminDashboard;
