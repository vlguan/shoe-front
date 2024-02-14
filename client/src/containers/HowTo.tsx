import React, { useEffect, useState } from 'react';
import axios from 'axios';
const HowTo = () => {
  const [howTo, setHowTo] = useState();
  useEffect(() => {
    const fetchHowTo = async () => {
    const description = await axios.get(`${process.env.REACT_APP_API_URL}/api/how-to`, {withCredentials:true})
    setHowTo(description.data)
    }
    fetchHowTo()
  },[]);
  let description={__html:`${howTo}`}
  console.log(description)
  return (
    <div className='howTo'>
      <div dangerouslySetInnerHTML={description} />
    </div>
  );
};

export default HowTo;
