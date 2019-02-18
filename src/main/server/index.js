const express = require('express');
const PORT = 9003;

import db from '../database';

export default function boostrapAPI(){
    const app = express();
    
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.get('/posts/new', (req, res) => {
        let post = { id: 1, title: 'lowdb is awesome' }
        // Add a post
        db.get('posts').push(post).write();

        res.send(post);
    });

    app.get('/posts', (req, res) => {
        let posts = db.get('posts').value();    

        res.send(posts);
    });
    
    app.listen(PORT, () => {
        console.log(`ExpressJS app listening on port ${PORT}!`)
    });

    return app;
}