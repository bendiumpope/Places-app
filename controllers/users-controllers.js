const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');


exports.getUsers = async (req, res, next) => {
    let users; 
    
    try {
        
        users= await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError('Fetching users failed', 500);

        return next(error);
    }

    res.json({
        users: users.map(user => user.toObject({ getters: true }))
    })
}

exports.signup = async (req, res, next) => {

    
    const { name, email, password } = req.body;

    // console.log(name, email, password);
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Signing up failed', 500);
        
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('User exists already, please login', 422);

        return next(error);
    }

    let hashPassword;

    try{
        hashPassword = await bcrypt.hash(password, 12);

    }catch(err){
        const error = new HttpError('Could not create user, please try again.', 500);

        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        password: hashPassword,
        image: req.file.path,
        places: []

    });

    try {
        
        await createdUser.save();

    } catch (err) {
        const error = new HttpError('Signing up user failed, saving', 500);
        
        return next(error);
    }

    let token;

    try{
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email }, 
            process.env.JWT_KEY, 
            { expiresIn: '24h'}
        );
    }catch (err){
        const error = new HttpError('Signing up user failed, token', 500);
        // console.log(err)
        return next(error);
    }

    res.status(201).json({
        userId: createdUser.id, email: createdUser.email, token: token
    });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Logging in failed', 500);

        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError('Invalid credentials provided', 403);

        return next(error); 
    }

    let isValidPassword = false;

    try{
        isValidPassword = await bcrypt.compare(password, existingUser.password)

    }catch(err){
        const error = new HttpError('Could not log you in please check your credentials and try again..', 500);

        return next(error);
    }

    if (!isValidPassword){
        const error = new HttpError('Invalid credentials, could not log you in', 403);

        return next(error);
    }

    let token;

    try{
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email }, 
            process.env.JWT_KEY, 
            { expiresIn: '24h'}
        );
    }catch (err){
        const error = new HttpError('Logging in user failed', 500);
        // console.log(err)
        return next(error);
    }

    res.status(200).json({ 
        userId:  existingUser.id, 
        email:  existingUser.email, 
        token: token
    });
    
}; 