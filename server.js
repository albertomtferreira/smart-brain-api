const express = require('express');
const bodyParser = require('body-parser');
const bcryptNodeJs = require('bcrypt-nodejs');
//const bcrypt = require('bcrypt');
//const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
// const API = process.env.API;

// const aws = require('aws-sdk');

// let API = new aws.API({
//   accessKeyId: process.env.API_KEY
// });

const aws = require('aws-sdk');

let API = new aws.S3({
  accessKeyId: process.env.API_KEY,
});

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL
  }
});
// ,`API ${DATABASE_URL}`
const app = express();
// ,`API ${s3.[0]}`
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> {res.send(`it is running PORT: ${process.env.PORT} - db: ${process.env.API_KEY}`)});
app.post('/signin', signin.handleSignin(db, bcryptNodeJs));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcryptNodeJs)});
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});


app.listen(process.env.PORT || 3000, ()=> {console.log(`app is running on port ${process.env.PORT} `)});
