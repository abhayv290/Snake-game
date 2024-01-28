import express from 'express';
import gameData from '../models/gameData.js';
import User from '../models/User.js';
const router = express.Router();
import isLogin from '../middleware/isLogin.js';



//Saving the score to based on the user
router.post('/score', isLogin, async (req, res) => {
    try {

        const {score} = req.body;

        const userInfo = req.session.id;
        if (userInfo) {

            const data = await gameData.create({
                user: userInfo,
                score: parseInt(score)
            })
            res.json({success: true, data: data});
        } else {
            res.status(400).send('Path score is required');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

})

//Api for fetching the Data from the server

router.get('/fetchscore', isLogin, async (req, res) => {
    const userInfo = req.session.id;
    try {

        if (userInfo) {
            const scoreinfo = await gameData.find({user: userInfo});
            const username = await User.findById(userInfo).select('username');
            if (scoreinfo && username) {
                res.json({success: true, username: username, data: {scoreinfo}});
            } else {
                res.send('database error')
            }
        } else {
            res.send('invalid credentials')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

export default router;
