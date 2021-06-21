
const question = {
    title: String,
    message: String,
    name: String,
    creator: String,
    selectedFile: String,
    createdAt: {
        type:Date,
        default: new Date()
    },
};

export default question