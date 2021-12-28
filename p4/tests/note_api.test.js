const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const config = require('../utils/config')
const logger = require('../utils/logger')
const api = supertest(app)
const Blog = require('../models/blog')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

// beforeAll(async () => {
//   try {
//     await mongoose.connect(config.MONGODB_URI)
//     logger.info('connected to MongoDB')
//   }
//   catch(error) {
//     logger.error('error connecting to MongoDB:', error.message)
//   }
// })

beforeEach(async () => {
  await Blog.deleteMany({})

  // const blogObjects = blogs
  //   .map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)
  await Blog.insertMany(blogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 20000)

test('there are Blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(blogs.length)
})

test('identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Type war',
    author: 'Robert C. Martinyy',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.htmlyy',
    likes: 2,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(blogs.length + 1)
  expect(titles).toContain(
    'Type war'
  )
}, 10000)

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'Sertyu war',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/Type.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likes = response.body.find((item) => item.title === 'Sertyu war')?.likes

  expect(likes).toBe(0)
}, 10000)

test('verifies that if the title and url properties are missing from the request data', async () => {
  const newBlog = {
    title: 'Sertyu war',
    author: 'Robert C. Martin',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
}, 10000)


afterAll(() => {
  console.log('afterAll11', mongoose.connection.readyState)
  mongoose.connection.close()
  console.log('afterAll22', mongoose.connection.readyState)
})

