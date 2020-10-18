const express = require('express');
const app = express();

const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

// db connection
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log('connected');
    }
);

// body-parser
app.use(express.json());

// routes middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);

app.listen(process.env.PORT, () =>
    console.log(`server running at ${process.env.PORT}`)
);
