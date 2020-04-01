const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const imageCount = require('./controllers/imageCount');

const db = knex ({
    client: 'pg',
    connection: {
      host : 'postgresql-shaped-86870',
      user : 'Alberto',
      password : 'AlbTao01',
      database : 'smart-brain'
    }
});

app.use(express.json());
app.use(cors());

// ROUTE
app.get('/', (req, res) => {res.send('it is working')})
//SIGNIN
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
//REGISTER
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
//PROFILE ID
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
//IMAGE COUNT
app.put('/image', (req, res) => {imageCount.handleImageCount(req, res, db)})

app.post('/imageurl', (req, res) => {imageCount.handleApiCall(req, res)})

app.listen(process.env.PORT || 3001, ()=> {console.log('app is running on port ${process.env.PORT}')})


/*
/ --> res = this is working
/signin --> Post = Success/Fail
/Register --> Post = user
/profile/:userID --> GET = user
/image --> PUT --> user
*/