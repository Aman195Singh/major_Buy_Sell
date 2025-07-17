const Product = require("../Model/product.model")
const auth =require("../Middleware/auth.middleware");
const uploadOnCloudinary = require("../Utils/uploadOnCloudinary");

exports.createProduct =async(req,res)=>{
    try{
        const {name ,category ,price ,availibility}=req.body;
    let imageUrl = null;

    if(req.file){
        const uploadResult = await uploadOnCloudinary(req.file.path);
        if(uploadResult){
            imageUrl = uploadResult.secure_url;
        }else{
            return res.status(500).json({message:"Image upload failed"});
            
        }
    }
    const product = new Product({
        name,
        category,
        price,
        availibility,
        image:imageUrl,
        postedBy:req.userId,
    });

    await product.save();
    res.status(201).json({message:"product is saved"})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
};

exports.getAllProduct = async(req,res) =>{
    try{
        const product = await Product.find().populate("postedBy","name email");
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.getProductById = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id).populate("postedBy","name email")
        if(!product){return res.status(404).json({message:"Product not found !"})}
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.getMyProduct =async(req,res)=>{
    try{
        const product = await Product.find({postedBy:req.userId});
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
exports.updateProduct =async(req,res) =>{
    try{
        const {name, category,price,availibility } =req.body;
        const product = await Product.findById(req.params.id);

        if(!product){return res.status(404).json({message:"Product not found"})};
        if(product.postedBy.toString() != req.userId){return res.status(403).json({message:"not Authorised to update this product "})}

        let imageUrl = product.image;
        if(req.file){
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if(uploadResult){
                imageUrl = uploadResult.secure_url;
            }else{
                return res.status(500).json({message:"image upload is failed !"})
            }
        }

        product.name =name || product.name;
        product.category=category || product.category;
        product.price = price || product.price;
        product.availibility =availibility !== undefined ? availibility:product.availibility;
        product.image =imageUrl;

        await product.save();
        return res.status(200).json({message:"product  upload successully",product});
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

exports.searchByCategory=async(req,res)=>{
    try{
        const {category} = req.query;
        if(!category){return res.status(400).json({message: "Category query parameter must required !"})}

        const product = await Product.find({category:{$regex: category, $options: "i"}});
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.deleteProduct=async(req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){return res.status(404).json({message:"Product not found ! "})}
        if(product.postedBy.toString() != req.userId){return res.status(403).json({message:"you are not authorised by to delete this product !"})}

        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Product is deleted Successfully"})
       }catch(err){
        res.status(500).json({error:err.message})
       }
}