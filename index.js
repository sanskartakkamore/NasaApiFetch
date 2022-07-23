import fetch from 'node-fetch';
import mongoose from 'mongoose';
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
// const connectToMongo = require('./db');
// const express = require('express')
// connectToMongo();
// const app = express()
// const port = 3000
// app.get('/', (req, res) => {
//     res.send('Hello Rover')
// })
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })


const Post = mongoose.model('Post',cacheSchema );
async function getPost() {
   const nasa = await fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=0&api_key=DEMO_KEY");
   const response = await nasa.json();
   //for(let i=0; i<=response.photos.length;i++){
       //console.log(response[i]['camera']);
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
//        const i=0;
//        console.log(response.photos[0]);
//    const post = new Post ({
//         id:response.photos[i]['id'],
//         sol:response.photos[i]['sol'],
//         camera:response.photos[i]['camera'].name,
//         img_src:response.photos[i]['img_src'],
//         rover:response.photos[i]['rover'].name,


//     });
   //console.log(post)
    Post.;
   }
//}

getPost();