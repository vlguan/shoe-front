import React, { useState, useEffect } from 'react';
import './itemup.css';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../../actions/auth.ts';
import CSRFToken from '../../actions/CSRFToken.js';
import { postImage, postProduct } from '../../actions/apiUtil.ts';
import AdminNav from '../../components/adminNav/adminNav.tsx';
const ItemUpload = ({ checkAuthenticated, isAuthenticated }) => {
  const [itemData, setItemData] = useState({
    name: '',
    price: '',
    link: '',
    description: '',
    selectedOption:'',
    model:'',
    sizes: [],
    ysizes:[]
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

  const handleSizeInputChange = (index: number, value: string) => {
    setItemData((prevData) => {
      const updatedSizes = [...prevData.sizes];
      const size = (index).toString(); // Adjust the size value to start from 1 and convert to string
      const existingSizeIndex = updatedSizes.findIndex((sizeObj) => sizeObj.size === size);
  
      if (existingSizeIndex !== -1) {
        // If size already exists, update the quantity
        updatedSizes[existingSizeIndex] = { size, quantity: value };
      } else {
        // If size doesn't exist, add a new entry
        updatedSizes.push({ size, quantity: value });
      }
  
      return {
        ...prevData,
        sizes: updatedSizes,
      };
    });
  };
  const handleFileChange = (event) => {
    const chosenFiles = Array.prototype.slice.call(event.target.files);
    setSelectedFiles(chosenFiles);
    const paths = chosenFiles.map(file=>file.name).join(',');
    setFilePaths(paths);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine item information and images
    const formData = new FormData();

    // Append item information to form data
    formData.append('name', itemData.name);
    formData.append('price', itemData.price);
    formData.append('link', itemData.link);
    formData.append('description', itemData.description);
    formData.append('model', itemData.model);
    const sizesString = itemData.sizes.map((sizeObj) => `${sizeObj.size}:${sizeObj.quantity}`);
    const ysizesString = itemData.ysizes.map((sizeObj) => `${sizeObj.size}:${sizeObj.quantity}`);
    const res = sizesString.concat(ysizesString)
    formData.append('size', JSON.stringify(res));
    formData.append('image_files', JSON.stringify(filePaths));
    // Append files to form data
    selectedFiles.forEach(async (file)=> {
        const imageData = new FormData();
        console.log(imageData)
        imageData.append('image', file)
        imageData.append('file_path', file['name'])
        console.log(await postImage(imageData))
      })
    console.log(await postProduct(formData))
  };
  const renderSizes = () => {
    const sizeInputs: JSX.Element[]=[]
    const sizes: string[]= [];
    // Generate sizes and corresponding input elements
    for (let i = 1; i <= 9; i++) {
      sizes.push(`${i}c`);
    }

    for (let i = 10; i <= 13.5; i += 0.5) {
      sizes.push(`${i}c`);
    }

    for (let i = 1; i <= 3; i += 0.5) {
      sizes.push(`${i}y`);
    }
    const sizeGroups = [];
    for(let i = 0; i < sizes.length; i += 2){
      sizeGroups.push(sizes.slice(i,i+2));
    }
    sizeGroups.forEach((group, groupIndex) => {
      sizeInputs.push(
        <div key={groupIndex} className="size-group">
          {group.map((size) => (
            <div key={size} className="size-input-container">
              <label htmlFor={`size${size}`}>{`${size}:`}</label>
              <input
                type="text"
                id={`size${size}`}
                name={`size${size}`}
                defaultValue="0"
                onChange={(e) => handleSizeInputChange(size, e.target.value)}
              />
            </div>
          ))}
        </div>
      );
    });
  
    return sizeInputs;
    };
  useEffect(() => {
    checkAuthenticated();
  }, [checkAuthenticated]);
  if (!isAuthenticated){
    return <Navigate to='/login'/>;
  }
  return (
    <div className="admin">
      <AdminNav/>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <CSRFToken />
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
              <label className="itemLink">Model:</label>
              <input
                type="text"
                id="itemModel"
                name="model"
                value={itemData.model}
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
        <div className="input-group">
        </div>
    
        <div className="input-group">
          <label className="selectedSizes">Selected Sizes:</label>
          <div>{renderSizes()}</div>
        </div>
        <button type="submit">Submit</button>     
      </form>
      
    </div>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated })(ItemUpload);
