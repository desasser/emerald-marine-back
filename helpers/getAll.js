const db = require('../models');

module.exports = {
    getAllBlogPosts: () => {
        db.BlogPost.find({}).then(data => {
            data ? res.json(data) : res.status(404).send('No blog posts found.')
        });
    },
    getAllNewsArticles: () => {
        db.NewsArticle.find({}).then(data => {
            data ? res.json(data) : res.status(404).send('No news articles found.')
        });
    },
    getAllPressReleases: () => {
        db.PressRelease.find({}).then(data => {
            data ? res.json(data) : res.status(404).send('No press releases found.')
        });
    },
    getAllProducts: () => {
        db.Product.find({}).then(data => {
            data ? res.json(data) : res.status(404).send('No press releases found.')
        });
    },

}