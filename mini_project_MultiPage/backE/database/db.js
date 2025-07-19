const mongoose =require ("mongoose")

const connectDB = async() =>{
    try{        
        await mongoose.connect(`mongodb+srv://aman195singh3107:EHYkTl7bTXcXPWm4@cluster0.fz7e4pm.mongodb.net/multiPage?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('MongoDB Connected')
    
    }
    catch(err){
        console.error("DB Error: ",err)
    }
}

module.exports= connectDB;