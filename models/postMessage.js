import mongoose from 'mongoose'
import question from './question.js'
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    price: Number,
    tags: [String],
    selectedFile: String,
    questions:{
        type: [question],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type:Date,
        default: new Date()
    },
    question:[question]
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;