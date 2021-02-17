const express = require('express')
const mongoose = require('mongoose')
const { result } = require('lodash')
const Blog = require('./models/blog')



const app = express()

const dbURL = 'mongodb+srv://Sachiko:12345@izumicluster.sjs2g.mongodb.net/nodeJS-lesson7?retryWrites=true&w=majority'

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>  app.listen(3001)) // listen for requests
  .catch ((err) => console.log(err))

app.set('view engine', 'ejs')

app.use(express.static('public'))

const links = [{text:'Home', link:'/'},{text:'Articles', link:'/about'}]

const blogs = [
  {
    img: '/img/computer.png',
    title: 'long established',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    time: 'May 20th 2020',
  },
  {
    img: '/img/peoples.png',
    title: 'long established',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    time: 'May 20th 2020',
  },
  {
    img: '/img/computer2.png',
    title: 'long established',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    time: 'May 20th 2020',
  },
]

app.get('/', (request, responce) => {
  responce.render('index', { blogs, links }).status(200)
})
app.get('/about', (req, res) => {
  res.render('about', { blogs }).status(200)
})
app.get('/blogs/create', (req, res) => {
  res.render('create').status(200)
})
app.get('/add-blog', (req,res) => {
  const blog = new Blog ({
    title:'Orange',
    description:'Orange orange',
    imgURL: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    date: '23.06.1499',
  });
  blog.save()
  .then((result) => res.send(result))
})

app.post('/posts')

app.get('/blogs', (req,res) => {
  Blog.find().then((result) => {
    res.render('index', { blogs: result, links })
  })
})
app.use((req, res) => {
  res.status(404).render('404')
})
