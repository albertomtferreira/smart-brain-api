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

let s3 = new aws.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('it is running',`API ${s3.[0]}`)});
app.post('/signin', signin.handleSignin(db, bcryptNodeJs));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcryptNodeJs)});
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});


app.listen(process.env.PORT || 3000, ()=> {console.log(`app is running on port ${process.env.PORT} `)});
