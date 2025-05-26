// VideoUpload.js (Frontend code)

/*import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [url, setUrl] = useState('');

  // Handle video file change
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Submit form to upload video
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', video); // Append video to FormData

    try {
      const res = await axios.post('http://localhost:5000/upload-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUrl(res.data.url); // Save the uploaded video URL
    } catch (err) {
      console.error('Error uploading video:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="video" accept="video/*" onChange={handleVideoChange} />
        <button type="submit">Upload Video</button>
      </form>
      {url && (
        <div>
          <h3>Uploaded Video:</h3>
          <video width="400" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;*/
/*import React, { useState } from 'react';
import axios from 'axios';

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setVideoUrl(response.data.url); // Save the Cloudinary URL
    } catch (err) {
      console.error('Error uploading video:', err);
    }
  };

  return (
    <div>
      <h1>Upload a Video</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {videoUrl && <video src={videoUrl} controls width="500" />}
    </div>
  );
};

export default UploadVideo;*/
// VideoUpload.js
import React, { useState } from 'react';
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
    
    console.log(" in video form ")
    const formData = new FormData();
    formData.append('video', selectedFile); // Append the video file
    console.log("video",selectedFile)
    console.log("formData in video upload",formData)
    try {
      setUploading(true);
      const response = await axios.post('/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Store the video URL returned from the server
      setVideoUrl(response.data.url);
      console.log("response.data.videoUrl",response.data.url)
      prop.trailerUrl(response.data.url)
      setUploading(false);
      
      //prop.handleVideoApp(response.data.videoUrl)
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


