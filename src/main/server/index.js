const express = require('express');
const PORT = 9000;

const uuidv4 = require('uuid/v4');

const faker = require('faker');

import db from '../database';

export default function boostrapAPI(){
    const app = express();
    
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.get('/posts/new', (req, res) => {
        let post = { _id: uuidv4(), title: faker.fake('{{lorem.words}}'), created_at: new Date(), updated_at: new Date() }
        // Add a post
        db.get('posts').push(post).write();

        res.send(post);
    });

    app.get('/posts', (req, res) => {
        let posts = db.get('posts').value()

        res.send(posts);
    });
    
    app.listen(PORT, () => {
        console.log(`API up listening on port ${PORT}!`)
    });

    return app;
}