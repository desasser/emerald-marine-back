const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const graphqlSchema = require('./models/index');
const extensions = ({context}) => {
    return {
        runTime: Date.now() - context.startTime,
    };
};
require('dotenv').config();

// const whitelist = ['http://localhost:3000']
// const corsOptions = {
//     origin: whitelist,
//     credentials: true,
//     optionSuccessStatus: 200,
//     methods: 'GET, HEAD, POST, PUT'
// }

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/emeraldmarine', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const app = express();
// app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    '/graphql', 
    graphqlHTTP((request) => {
        return {
            context: {startTime: Date.now()},
            graphiql: true,
            schema: graphqlSchema,
            extensions,
        };
    })
);

const userRoutes = require('./controllers/userController');
const productRoutes = require('./controllers/productController');
const blogRoutes = require('./controllers/blogPostController');
const newsRoutes = require('./controllers/newsController');
const mailingRoutes = require('./controllers/mailingListController');
const testRoutes = require('./controllers/productTestListController');
const pressRoutes = require('./controllers/pressController');
const authjsRoutes = require('./controllers/authJSController');
const shippoRoutes = require('./controllers/shippoController');
// const imageRoutes = require('./controllers/imageController');

app.use(blogRoutes);
app.use(productRoutes);
app.use(userRoutes);
app.use(newsRoutes);
app.use(pressRoutes);
app.use(mailingRoutes);
app.use(testRoutes);
app.use(authjsRoutes);
app.use(shippoRoutes);
// app.use(imageRoutes);

app.get('/', (req, res) => {
    res.send('Welcome! Nothing to see here.')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
