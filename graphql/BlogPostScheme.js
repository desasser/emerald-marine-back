const {BlogPostTC} = require('../models/BlogPost');
require('../mutation/BlogPost.mutation');

const BlogPostQuery = {
    BlogPostById: BlogPostTC.getResolver('findById'),
    BlogPostByIds: BlogPostTC.getResolver('findByIds'),
    BlogPostOne: BlogPostTC.getResolver('findOne'),
    BlogPostMany: BlogPostTC.getResolver('findMany'),
    BlogPostCount: BlogPostTC.getResolver('count'),
    BlogPostConnection: BlogPostTC.getResolver('connection'),
    BlogPostConnection: BlogPostTC.getResolver('pagination'),
}

const BlogPostMutation = {
    BlogPostCreateOne: BlogPostTC.getResolver('createOne'),
    BlogPostCreateMany: BlogPostTC.getResolver('createMany'),
    BlogPostUpdateById: BlogPostTC.getResolver('updateById'),
    BlogPostUpdateOne: BlogPostTC.getResolver('updateOne'),
    BlogPostUpdateMany: BlogPostTC.getResolver('updateMany'),
    BlogPostRemoveById: BlogPostTC.getResolver('removeById'),
    BlogPostRemoveOne: BlogPostTC.getResolver('removeOne'),
    BlogPostRemoveMany: BlogPostTC.getResolver('removeOne'),
    fakeData: BlogPostTC.getResolver('BlogPost')
};

module.exports = {BlogPostQuery, BlogPostMutation}