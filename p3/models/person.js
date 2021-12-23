const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

const password = process.argv[2]

const url = process.env.MONGODB_URI || `mongodb+srv://Uladzimir:${password}@cluster0.dltk5.mongodb.net/note-app?retryWrites=true&w=majority`
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 8, unique: true },
  number: { type: String, required: true, minLength: 3, unique: true },
})
// Apply the uniqueValidator plugin to userSchema.
noteSchema.plugin(uniqueValidator)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Person = mongoose.model('Person', noteSchema)

// if (process.argv.length === 3) {
//   Person.find({}).then(result => {
//     console.log('phonebook:')
//     result.forEach(note => {
//       console.log(note.name + ' ' + note.number)
//     })
//     mongoose.connection.close()
//   }).catch(err => {
//     console.log(err)
//     mongoose.connection.close()
//   })
// } else {
//   const note = new Person({
//     name: process.argv[3],
//     number: process.argv[4],
//   })
//   console.log(note)
//   note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   }).catch(err => {
//     console.log(err)
//     mongoose.connection.close()
//   })
// }

module.exports = Person