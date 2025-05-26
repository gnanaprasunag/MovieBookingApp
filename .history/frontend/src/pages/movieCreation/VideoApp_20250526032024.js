import { useState } from 'react';
import axios from '../../config/axios';

const VideoUpload = (prop) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append('video', selectedFile); // Append the video file

    try {
      setUploading(true);
      const response = await axios.post('/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Store the video URL returned from the server
      setVideoUrl(response.data.url);
      prop.trailerUrl(response.data.url)
      setUploading(false);
    
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Trailer:</h2>
      
        <input type="file" accept="video/*"  onChange={handleFileChange} />
        <button type="submit" onClick={handleSubmit} disabled={!selectedFile || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>


      {videoUrl && (
        <div>
          <h3>Uploaded Video:</h3>
          <video width="400" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;


