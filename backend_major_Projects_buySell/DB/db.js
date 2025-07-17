const mongoose =require ("mongoose")

const connectedDB = async() =>{
    try{        
        await mongoose.connect(`mongodb+srv://aman195singh3107:EHYkTl7bTXcXPWm4@cluster0.fz7e4pm.mongodb.net/buy_sell?retryWrites=true&w=majority&appName=Cluster0`)
        .then(()=>{console.log('MOngoDB Connected')})
        .catch((err)=>{console.log("DB Error: ",err)})
    }
    catch(err){
        console.error("DB Error: ",err)
    }
}

module.exports= connectedDB;