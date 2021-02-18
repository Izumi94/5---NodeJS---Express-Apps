const express = require('express')
const mongoose = require('mongoose')
const { result } = require('lodash')
const Blog = require('./models/blog')
const { request, response } = require('express')

const app = express()

app.use(express.static('public'));
app.use(express.urlencoded());

const dbURL = 'mongodb+srv://Sachiko:12345@izumicluster.sjs2g.mongodb.net/nodeJS-lesson7?retryWrites=true&w=majority'

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>  app.listen(3001)) // listen for requests
  .catch ((err) => console.log(err))

app.set('view engine', 'ejs')

const links = [{text:'Home', link:'/'},{text:'Articles', link:'/about'}]



app.get('/', (request, responce) => {
  responce.render('index', { blogs, links }).status(200)
})

app.get('/about', (req, res) => {
  res.render('about', { blogs }).status(200)
})

app.get('/blogs/create', (req, res) => {
  res.status(200).render('create')
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

app.post('/blogs', (request, response) => {
  const blog = new Blog(request.body);
  blog.save().then(() => {
    response.redirect('/blogs');
  })
})

app.get('/blogs', (req, res) => {
  Blog.find().then( (blogs) => {
    res.render('index', {blogs, links});
  })
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    res.render('blogDetails', {blog: result });
  });
})

app.use((req, res) => {
  res.status(404).render('404')
})
