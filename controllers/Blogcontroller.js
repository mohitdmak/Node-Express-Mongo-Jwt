const express = require('express');
const Blog = require('../models/Blog.js');

const getablog = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            console.log(`Blog data with id ${id} is fetched.`);
            res.render('blog', {blog : result})
        }).catch((err) => {
            console.error(err);
        });
};

const postblog = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            console.log('New blog is saved');
            res.redirect('/');
        }).catch((err) => {
            console.error(err);
        });
};

const deleteblog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            console.log(`Blog data with id ${id} is deleted by using jquery`);
            res.json({redirect: '/all'});
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = {
    getablog,
    postblog,
    deleteblog,
}