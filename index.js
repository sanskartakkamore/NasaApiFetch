import fetch from 'node-fetch';
import mongoose from 'mongoose';
//var express = require('express');
//var router = express.Router();
const mongoURI = "mongodb://localhost:27017/Nasa-cached-db"
mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
});
const { Schema } = mongoose;
const cacheSchema= new mongoose.Schema({
    id:{
        type: Number,
    required: true
    },
    sol:{
        type: Number,
    },
    camera:{
    //     name:{
    //         type: String,
    // required: true
    //     },
        type: String,
    required: true
    },
    img_src:{
        type:String,
    },
    rover:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
      }

});



const Post = mongoose.model('Post',cacheSchema );
async function getPost(req,res) {
   const nasa = await fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=0&api_key=DEMO_KEY");
   const response = await nasa.json();
   //for(let i=0; i<=response.photos.length;i++){
       //console.log(response[i]['camera']);
       //console.log(response.photos[0]);
       const newPhotos = [];
       response.photos.forEach(p=>{
            if(p.id){
                newPhotos.push({id: p.id,
                camera: p.camera.name,
                roverName: p.rover.name,
                sol: p.sol,
                date: p.date
                });
            }    
    });
    console.log(newPhotos);
    // console.log('do code is working till here') 
    // response.newPhotos.insertMany([ response.photos
    
    //  ])

    Post.insertMany(newPhotos, function(error, docs) {});
    // try {
    //     const saveData = await newPhotos.save()
    //     res.json(saveData)
    //     console.log("is working")
    // } catch(err) {
    //     res.json({
    //         message: err
    //     })
    //  }
     console.log("is it working till here")
    // response.collection("posts").insertMany(newPhotos, (error, res) => {
    //     if (error) throw error;
    
    //     console.log('Docs inserted!');
    //     db.close();
    //   });

}


getPost();