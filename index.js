const express = require('express');
const cors = require('cors'); 
const artifactRouter = require('./artifactRouter');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect('mongodb://localhost:27017/artifactsDB', )
        .then(() => console.log('Connected to MongoDB successfully'))
        .catch((err) => console.error('MongoDB connection error:', err));
};
module.exports = connectToDB;

connectToDB();
app.use('/artifacts', artifactRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
