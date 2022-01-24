const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

//import routes
const userRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile');
const postsRoutes = require('./routes/api/posts');

//db config
const db = require('./config/keys').mongoURL;

//db connect
mongoose.connect(db)
    .then(() => { console.log("mongoDB connected") })
    .catch((err) => { console.log(err) })

app.get('/', (req, res) => {
    res.send("Server Connected");
})

//use Routes
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);


app.listen(PORT, () => console.log("Server started"))