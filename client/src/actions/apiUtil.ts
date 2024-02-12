import axios from "axios";
import Cookies from 'js-cookie';
const BASE_URL = 'https://little-feet.s3.us-west-1.amazonaws.com/product/'

export const fetchImage = async()=> {
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/image/?start=59&end=63`, {
        method:'GET',
      });
      // console.log(response)
      if(response.status === 200){
        const data = await response.json();
        const filePaths = data.map(image => BASE_URL + image.file_path);
        return filePaths;
      }
    }catch (error) {
      console.error('Error while fetching images', error);
    }
  }
export const fetchProduct = async(start,end)=> {
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/gallery/?start=${start}&end=${end}`, {
        method:'GET',
      });
      // console.log(response)
      if(response.status === 200){
        return await response.json()
      }
    }catch (error){
      console.error('Error while fetching items', error);
    }
  }
export const postProduct = async(formData) =>{
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/item/`, formData, {
      withCredentials:true,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': Cookies.get('csrftoken'),
      }
    });
    if(response.status === 200){
      return await response.data
    }
  }catch(error){
    console.error('Error while posting items', error);
  }
}
// formData.append('name', itemData.name);
// formData.append('price', itemData.price);
// formData.append('link', itemData.link);
// formData.append('description', itemData.description);
// formData.append('size', itemData.size);
// formData.append('image_files', JSON.stringify(filePaths));
export const postImage = async(imageData)=> {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/image/`, imageData, {
      
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': Cookies.get('csrftoken'),
      }
    });
    if(response.status === 200){
      return await response.data
    }
  }catch(error){
    console.error('Error while posting image', error);
  }
}