import express from 'express'
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'
import postMessage from '../models/postMessage.js'
import question from '../models/question.js';

const router = express.Router()

export const getPosts = async (req, res)=>{
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    }
    catch(e){
        res.status(404)
    }
}

export const getPost = async (req, res)=>{
    console.log(req.params)
    console.log(req.body)
    try{
        const postMessages = await PostMessage.find(req.params.id);
        console.log(postMessages)
        res.status(200).json(postMessages)
    }
    catch(e){
        res.status(404)
    }
}

export const createPost = async(req, res)=>{
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
    try{
        await newPost.save()
        
        res.status(201).json(newPost)
    }
    catch(error){
        res.status(409).json({message: error})
    }
}

export const updatePost= async(req,res)=>{
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { ...req.body, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    console.log('delete')
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted successfully'})
}

export const likePost = async(req, res)=>{
    const{id} = req.params;
    console.log()
    if(!req.userId)return res.json({message: 'Unauthenticated'})


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);
    console.log(post.likes)
    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }
    else{
        post.likes = post.likes.filter((id)=>id!=String(req.userId));
    }
        
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

    res.json(updatedPost);
}


export const comment = async(req, res)=>{
    const{id} = req.params;
    const{commentData} = req.body;
    //console.log(commentData)
    console.log(id)
    if(!req.userId)return res.json({message: 'Unauthenticated'})


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);
    post.questions.push(commentData);
    

    await PostMessage.findByIdAndUpdate(id, post, {new: true})
    const updatedPost = { ...post, _id: id };
    //console.log(updatedPost)
    res.status(200).json(updatedPost);
}


export default router