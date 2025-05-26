import React, { useState } from 'react';
import axios from '../../config/axios';

const ImageUpload = (prop) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("res.data.url",res.data)
      if(prop.posterUrl){
        prop.posterUrl(res.data.url)
      }
      else if(prop.handleCastUrl){
      prop.handleCastUrl(res.data.url)}
      else if (prop.handleCrewUrl){
        prop.handleCrewUrl(res.data.url)
      }
     
      else if(prop.handlebdayurl){
        prop.handlebdayurl(res.data.url)
      }
      else if(prop.handleannurl){
        prop.handleannurl(res.data.url)
      }
      else if(prop.handlesnackurl){
        prop.handlesnackurl(res.data.url)
      }
      setImage('')
      setUrl(res.data.url); // Cloudinary image URL
      
    } catch (err) {
      console.error('Error uploading image', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Upload Image:</h2>
        <input type="file" name="image"  onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
      url-{url}
      
    </div>
  );
};

export default ImageUpload;
