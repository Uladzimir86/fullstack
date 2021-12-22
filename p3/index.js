require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// const generateId = () => {
//     const maxId = notes.length > 0
//       ? Math.max(...notes.map(n => n.id))
//       : 0
//     return maxId + 1
// }



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/local', (request, response) => {
  console.log(request.body)
  const data = `
      <p>Phonebook has X people</p> <br/>
      ${new Date()}
    `
  return response.send(data)
})

app.get('/api/persons', (request, response) => {

  Person.find({}).then(result => {
    response.json(result)
  }).catch(err => {
    console.log(err)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  // if (notes.find((item) => item.name === body.name) ) {
  //   return response.status(409).json({
  //     error: 'The name already exists in the phonebook'
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  // Person.exists({ name: body.name })
  // .then(result => {
  //   if(!result) {
  //     person.save().then(savedNote => {
  //       response.json(savedNote)
  //     })
  //   } else {
  //     Person
  //     .findOneAndUpdate({ name: body.name }, {number: body.number}, { new: true })
  //     .then(updatedNote => {
  //       response.json(updatedNote)
  //     })
  //     .catch(error => next(error))
  //   }
  // })

  person.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error => next(error))

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
// this has to be the last loaded middleware.
app.use(errorHandler)

