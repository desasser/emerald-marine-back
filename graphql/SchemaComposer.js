const {SchemaComposer} = require('graphql-compose');

const schemaComposer = new SchemaComposer();

const {BlogPostQuery, BlogPostMutation} = require('./BlogPostScheme');
const { PressReleaseMutation, PressReleaseQuery } = require('./PressReleaseScheme');
const { ProductQuery, ProductMutation } = require('./ProductScheme');
const { ProductTestQuery, ProductTestMutation } = require('./ProductTestScheme');
const {NewsArticleQuery, NewsArticleMutation} = require('./NewsArticleScheme');
const {MailingListQuery, MailingListMutation} = require('./MailingListScheme');
const {UserQuery, UserMutation} = require('./UserScheme');

schemaComposer.Query.addFields({
    ...BlogPostQuery,
    ...MailingListQuery,
    ...NewsArticleQuery,
    ...PressReleaseQuery,
    ...ProductQuery,
    ...ProductTestQuery,
    ...UserQuery
});

schemaComposer.Mutation.addFields({
    ...BlogPostMutation,
    ...MailingListMutation,
    ...NewsArticleMutation,
    ...PressReleaseMutation,
    ...ProductMutation,
    ...ProductTestMutation,
    ...UserMutation
});