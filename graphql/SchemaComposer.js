const {SchemaComposer} = require('graphql-compose');

const schemaComposer = new SchemaComposer();

const {BlogPostQuery, BlogPostMutation} = require('./BlogPostScheme');

schemaComposer.Query.addFields({
    ...BlogPostQuery
});

schemaComposer.Mutation.addFields({
    ...BlogPostMutation
});