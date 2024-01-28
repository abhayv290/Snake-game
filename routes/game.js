import express from 'express';
import gameData from '../models/gameData.js';

const router = express.Router();
import isLogin from '../middleware/isLogin.js';



//Saving the score to based on the user
router.post('/score', isLogin, async (req, res) => {
    try {

        const {score} = req.body;

        const userInfo = req.session.id;

        if (userInfo) {
            const username = req.session.cookie;
            const data = await gameData.create({
                user: userInfo,
                username: username,
                score: score
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

//Api for fetching the Data from the server based on the user

router.get('/fetchscore', isLogin, async (req, res) => {
    const userInfo = req.session.id;
    try {

        if (userInfo) {
            const scoreinfo = await gameData.find({user: userInfo});

            if (scoreinfo) {
                res.json({success: true, username: req.session.cookie, data: {scoreinfo}});
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

//fetch score for the leaderBoard
router.get('/fetchleaderboard', isLogin, async (req, res) => {
    const userinfo = req.session.id;

    try {
        if (userinfo) {
            // Assuming gameData.find() returns a promise
            const scores = await gameData.find().select(['-user', '-_id']);

            if (scores) {
                res.json({success: true, data: {scores}});
            } else {
                res.status(500).send('Scores not found');
            }
        } else {
            res.status(401).send('Login first');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


export default router;
