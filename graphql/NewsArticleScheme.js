const {NewsArticleTC} = require('../models/NewsArticle');
require('../mutation/NewsArticle.mutation');

const NewsArticleQuery = {
    NewsArticleById: NewsArticleTC.getResolver('findById'),
    NewsArticleByIds: NewsArticleTC.getResolver('findByIds'),
    NewsArticleOne: NewsArticleTC.getResolver('findOne'),
    NewsArticleMany: NewsArticleTC.getResolver('findMany'),
    NewsArticleCount: NewsArticleTC.getResolver('count'),
    NewsArticleConnection: NewsArticleTC.getResolver('connection'),
    NewsArticleConnection: NewsArticleTC.getResolver('pagination'),
}

const NewsArticleMutation = {
    NewsArticleCreateOne: NewsArticleTC.getResolver('createOne'),
    NewsArticleCreateMany: NewsArticleTC.getResolver('createMany'),
    NewsArticleUpdateById: NewsArticleTC.getResolver('updateById'),
    NewsArticleUpdateOne: NewsArticleTC.getResolver('updateOne'),
    NewsArticleUpdateMany: NewsArticleTC.getResolver('updateMany'),
    NewsArticleRemoveById: NewsArticleTC.getResolver('removeById'),
    NewsArticleRemoveOne: NewsArticleTC.getResolver('removeOne'),
    NewsArticleRemoveMany: NewsArticleTC.getResolver('removeOne'),
    fakeData: NewsArticleTC.getResolver('NewsArticle')
};

module.exports = {NewsArticleQuery, NewsArticleMutation}