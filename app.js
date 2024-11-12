const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = []; // Array to hold blog posts

// Pagination settings
const POSTS_PER_PAGE = 3;

// Route: Home - Display paginated posts
app.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const start = (page - 1) * POSTS_PER_PAGE;
    const paginatedPosts = posts.slice(start, start + POSTS_PER_PAGE);
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

    res.render('layout', { page: 'home', posts: paginatedPosts, currentPage: page, totalPages });
});

// Route: Create Post - Show Create Post Form
app.get('/create', (req, res) => {
    res.render('layout', { page: 'create' });
});

// Route: Create Post - Handle Form Submission
app.post('/create', (req, res) => {
    const newPost = { 
        title: req.body.title, 
        content: req.body.content, 
        comments: [], 
        likes: 0 
    };
    posts.push(newPost);
    res.redirect('/');
});

// Route: Add Comment
app.post('/comment', (req, res) => {
    const { index, comment } = req.body;
    posts[index].comments.push(comment);
    res.redirect('/');
});

// Route: Like Post
app.post('/like', (req, res) => {
    const index = parseInt(req.body.index);
    posts[index].likes += 1;
    res.redirect('/');
});

// Start the server
app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});
