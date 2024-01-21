const BASE_URL = 'https://little-feet.s3.us-west-1.amazonaws.com/product/'
export const fetchImage = async()=> {
    try{
      const response = await fetch('http://localhost:8000/api/get-image/?start=59&end=63', {
        method:'GET'
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
export const fetchProduct = async()=> {
    try{
      const response = await fetch('http://localhost:8000/api/get-item/?start=1&end=10', {
        method:'GET'
      });
      // console.log(response)
      if(response.status === 200){
        return await response.json()
      }
    }catch (error){
      console.error('Error while fetching items', error);
    }
  }