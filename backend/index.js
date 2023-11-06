const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Post =  require('./models/Post');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const salt = bcrypt.genSaltSync(10);
const secret = "eripwdmasd123234xw324dljwprejw"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json())

app.use(cors({credentials: true, origin: 'http://localhost:3000'})); // CORS issue resolved using CORS package

mongoose.connect('mongodb+srv://yogeshm:0uHqjg7Pw1Qhgbra@cluster0.fodjrp2.mongodb.net/?retryWrites=true&w=majority')


// User Register API call
app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userData = await User.create(
            {username, 
            password: bcrypt.hashSync(password, salt)
        })
        res.status(200).json(userData); 
    }catch(e){
        res.status(400).json(e);
    }
});


// User Login API call
app.post('/login', async (req, res) => {
    const {username, password} = req.body; 
    const userExist = await User.findOne({username});
    const passCheck = bcrypt.compareSync(password, userExist.password);
    if(passCheck){
        // Login successfully
        jwt.sign({username, id:userExist._id}, secret, {}, (err, token) => { // token set in cookie using JWT
            if(err) throw err;
            res.cookie('token', token).json({
                id: userExist._id,
                username
            })
        } )
    }else{
        // login failed
        res.status(400).json('Wrong credentials.')
    }
})


// Get user details
app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    })
})

// logout user
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('Ok')
})

// create new post
app.post('/post', bodyParser.json(), async (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err, info) => {
        console.log('info',info);
        if(err) throw err;
        const {title, description} = req.body;
        const createPostData = await Post.create({
            author: info,
            title, 
            description,
        })
        res.json(createPostData);
    })
    
})

app.get('/allposts', async (req, res) => {
    // const posts = await Post.find();
    res.json(await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    );
});


app.get('/myblogs', async(req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err, info) => {
        if(err) throw err;
        res.json(await Post.find({"author.username": info.username}));
    })
});

// app.delete('/deletepost', bodyParser.json(), async(req, res) => {
//     const id = JSON.parse(req.body.id);
//     res.json(await Post.deleteOne({'id': id}));
// });


app.listen(4000);

//username:yogeshm
//password:0uHqjg7Pw1Qhgbra

//mongodb+srv://yogeshm:0uHqjg7Pw1Qhgbra@cluster0.fodjrp2.mongodb.net/?retryWrites=true&w=majority
