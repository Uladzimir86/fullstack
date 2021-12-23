const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})
const Blog = mongoose.model('Blog', blogSchema)

// const password = process.argv[2]
// const mongoUrl = process.env.MONGODB_URI || `mongodb+srv://Uladzimir:${password}@cluster0.dltk5.mongodb.net/note-app?retryWrites=true&w=majority`

module.exports = Blog;