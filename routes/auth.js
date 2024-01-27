import express from 'express';
import User from '../models/User.js';
import {body, validationResult} from 'express-validator';
import cookieSession from 'cookie-session'
import isLogin from '../middleware/isLogin.js';
const router = express.Router();

//SignUp request with POST request
router.post('/signup', [body('password').isLength({min: 5})], async (req, res) => {
    const {email, password} = req.body;
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(500).json({error: error})
        } else {
            const newUser = await User.create({
                username: email.slice(0, email.indexOf('@')),
                email_id: email,
                password: password,
            })
            req.session.userId = newUser._id;
            res.json({success: true, user: req.session});

        }

    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            // Duplicate key error
            res.status(400).json({success: false, error: 'Duplicate key violation'});
        } else {
            // Other MongoDB errors
            console.error(error);
            res.status(500).json({success: false, error: 'Internal server error'});
        }
    }
})



//Router2 : Handling Login Request 
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {

        const user = await User.findOne({email_id: email});
        if (user && user.password === password) {
            req.session.id = user._id;
            res.json({success: true, user: req.session});
        } else {
            res.status(401).json({error: false, error: 'unauthorized user'})
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: 'unauthorized'});
    }
})

//Geting the user info
router.get('/me', isLogin, async (req, res) => {
    const userInfo = await User.findById(req.userId).select('-password');
    if (userInfo) {
        res.json({success: true, user: userInfo});
    } else {
        res.status(401).send('unauthorized');
    }
})



export default router
