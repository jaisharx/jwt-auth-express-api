const express = require('express');
const app = express();

const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

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

// middlewares
app.use(express.json());

// routes middlewares
app.use('/api/user', authRoute, (e) => {
    console.log(e);
});

app.listen(process.env.PORT, () =>
    console.log(`server running at ${process.env.PORT}`)
);
