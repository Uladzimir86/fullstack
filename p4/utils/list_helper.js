const dummy = (blogs) => {
  return 1
}
const totalLikes = (list) => {

  if (list.length === 0) return 0
  if (list.length === 1) return list[0].likes
}
// const favoriteBlog = (list) => Math.max(...list.map(item => item.likes))
const favoriteBlog = (list) => {
  let obj = list.find(item => item.likes === Math.max(...list.map(item => item.likes)))
  delete obj.__v
  delete obj._id
  delete obj.url
  return obj
}
const mostBlogs = (list) => {
  let obj = {}
  let max = 0
  for (let i = 0; i < list.length; i++) {
    const blogs = list.filter(item => item.author === list[i].author).length
    if (max < blogs) {
      max = blogs
      obj.author = list[i].author
      obj.blogs = blogs
    }
  }
  return obj
}

const mostLikes = (list) => {
  let obj = {}
  let max = 0
  for (let i = 0; i < list.length; i++) {
    const likes = (list.filter(item => item.author === list[i].author)).reduce((sum, item) => sum + item.likes, 0)
    if (max < likes) {
      max = likes
      obj.author = list[i].author
      obj.likes = likes
    }
  }
  return obj
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}