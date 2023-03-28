require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");



mongoose.set('strictQuery', false);

try{
    mongoose.connect(
	process.env.DATABASE_URL,
	{useNewUrlParser:true, useUnifiedTopology:true}
    );
} catch(e) {
    console.log(e);
}

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));


app.use(cors());
app.use(express.json());

const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/users');

app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('server started');
});


