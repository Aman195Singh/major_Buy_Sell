const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dhwl1dy26', 
        api_key: '814539959557124', 
        api_secret: 'BqtzagqRYj8f4ByEWkXqSRv5Ejc' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadOnCloudinary = async(localFilePath) =>{
        try{
            const  formattedPath =path.resolve(localFilePath).replace(/\\/g,"/");

            const result = await cloudinary.uploader.upload(formattedPath ,{
                resource_type:"image",
            });

            fs.unlinkSync(formattedPath);
            return result;
        }catch(error){
            console.error("Cloudinary Upload Error:",error);
            if(fs.existsSync(localFilePath)){
                fs.unlinkSync(localFilePath);
            }
            return null;
        }
     };

   module.exports = uploadOnCloudinary;
    