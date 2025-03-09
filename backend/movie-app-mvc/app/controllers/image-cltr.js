import cloudinary from 'cloudinary'

let CLOUDINARY_CLOUD_NAME='dxrbuyd4b'
let CLOUDINARY_API_KEY='398659477963413'
let CLOUDINARY_API_SECRET='STBbwxl6U7yk_Zt55xEx17AHYRI'

// Cloudinary Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

let imageCltr={}

imageCltr.image=async(req, res) => {
  try {
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath)
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      url: result.secure_url
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message
    });
  }
};

imageCltr.video=async(req, res) =>  {
    let a
    try {
      const file = req.files.video;
      const result = await cloudinary.uploader.upload_large(file.tempFilePath,function (result) {
       a=result
      
        res.status(200).json({
          success: true,
          message: 'video uploaded successfully',
          result:a,
          url: a.secure_url})
        },{resource_type: 'video'});
      ;
    } catch (e) {
      res.status(500).json({ error: 'something went wrong'})
    }
  }

export default imageCltr
