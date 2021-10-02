const express = require('express');
const mongodb = require('mongodb'); 
const router = express.Router();
const mongoose = require('mongoose'); 

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/posts'; 
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Define a schema
const Schema = mongoose.Schema;

const PostSchema = new Schema({ 
  text: String
});

const PostModel = mongoose.model('PostModel', PostSchema);

// function used in routers 
const savePost = async (text) =>{ 
    const newPost = new PostModel({text});
    await newPost.save(); 
}

// Get Posts

router.get('/api/posts', async (req, res) =>{
  try{
    const posts = await PostModel.find({}); // gets all posts 
    res.send(posts); 
  }catch(e){
    res.send({status: 'Could not load posts'}); 
  }
 
}); 

// Add Post
router.post('/api/posts', async (req, res) =>{
  try{
    const postText = req.body.text;
    const existingPost = await PostModel.find({text: postText}); 
    if (existingPost.length){  
      return res.send({status: 'Post already Exists, cannot add post'}); 
    }
    await savePost(postText);
    res.send({status: 'Successfully saved.'}); 
  }catch(e){
    res.send( {status : 'Error saving post' }); 
  }

}); 

//Delete Post
router.delete('/api/posts', async (req, res) =>{
    try{
      const postText = req.body.text;  
      await PostModel.deleteOne({text: postText});
      res.send({status: 'Successfully deleted.'});  
    }catch(e){
      res.send({status:'Error deleting post'}); 
    }
}); 

router.patch('/api/posts', async (req, res) =>{
    try{
        const text = req.body.text;
        const newText = req.body.newText;
        await PostModel.updateOne({text}, {text: newText}); 
        res.send({status: 'Succesfully updated.'}); 

    }catch(e){
      res.send({status: 'Error updating post'});  
    }
}); 


module.exports = router; 