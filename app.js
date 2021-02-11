const express = require('express');

// express app
const app = express();

app.set('view engine', "ejs")

const blogs = [
  { title: 'Something', snippet: 'Anything'},
  { title: 'Something', snippet: 'Anything'},
  { title: 'Something', snippet: 'Anything'}
]


app.get('/', (request, response) => {
  response.render('index', { blogs })
})

app.get('/about', (request, response) => {
  response.render('about')
})

app.get('/blogs/create', (request, response) => {
  response.render('create')
})

app.get((request, response) => {
  response.status(404).render('404')
})

// listen for requests
app.listen(3004);



// app.get('/', (req, res) => {
//   // res.send('<p>home page</p>');
//   res.sendFile('./views/index.html', { root: __dirname });
// });

// app.get('/about', (req, res) => {
//   // res.send('<p>about page</p>');
//   res.sendFile('./views/about.html', { root: __dirname });
// });

// // redirects
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

// // 404 page
// app.use((req, res) => {
//   res.status(404).sendFile('./views/404.html', { root: __dirname });
// });
