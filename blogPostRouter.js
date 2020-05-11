const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models.js');

BlogPosts.create({
    title: 'Austins Great Day',
    content: 'Lorim Ipsum on repeat',
    author: 'Austin Fisher',
    publishDate: 1988
})
BlogPosts.create({
    title: 'Its always sunny in San Francisco',
    content: 'The coldest day I ever had was a summer in San Francisco',
    author: 'Mark Twain',
    publishDate: 1927
    })
BlogPosts.create({
    title: 'To Live and Die in LA',
    content: 'Is the place to be, you got to be there to know it',
    author: '2pac Shakur',
    publishDate: 1994
    })



router.get('/', (req, res) => {
    // read, return blog post
    console.log('Hitting get');
    res.json(BlogPosts.get());
})

router.post('/', jsonParser, (req, res) => {
    // update by Id and make sure apporproate fields are there
    let requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
        let field = requiredFields[i];
        if (!(field in req.body)) {
            let message = `Missing ${field} in req.body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    console.log('Creating new post');
    const newPost = BlogPosts.create({
                                    title: req.body.title,
                                    author: req.body.author,
                                    content: req.body.content      
    })
    res.status(201).json(newPost);
})

router.put('/:id', (req, res) => {
    // create, make sure correct fields are sent
    let requiredPutFields = ['id', 'title', 'content', 'author', 'publishDate'];
    for (let i = 0; i < requiredPutFields.length; i++) {
        let field = requiredPutFields[i];
        if (!(field in req.body)) {
            let message = `Missing ${field} in req.body`;
            console.error(message);
            res.status(401).send(message);
        }
    }

    if (req.params.id !== req.body.id) {
        let message = `Req.body ID and req.params.id must be teh same`;
        console.error(message);
        res.status(401).send(message);
    }

    console.log(`Updating ${req.body.parms} in blog post`);
    BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(204).end();
})

router.delete('/:id', (req, res) => {
    // delete by id
    BlogPosts.delete(req.params.id);
    console.log(`Deleteing post for ${req.params.id}`)
    res.status(204).end();
})

module.exports = router;