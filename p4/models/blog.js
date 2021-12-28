const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 }
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

module.exports = Blog