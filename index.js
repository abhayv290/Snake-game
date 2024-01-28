import express from "express";
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import gameRoute from './routes/game.js'
import cookieSession from "cookie-session";
import {fileURLToPath} from 'url';
import path from "path";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT;


//Create a mongoDb connnection
mongoose.connect(process.env.MONGO_URI);


// Middleware for cookie-based session management
app.use(cookieSession({
    name: 'session',
    keys: ['Hey'],
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
}));


//express middleware to handle the functions
app.use(express.static('public'));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Routes
app.use('/auth', authRoute);
app.use('/game', gameRoute);





// Creating the Routing for frontEnd /Client
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'html', 'index.html'), (err) => {
        if (err) {
            console.log('File not sent:', err);
            res.send('File not sent');
        } else {
            console.log('File sent successfully');
        }
    });
});
app.get('/me', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'html', 'me.html'), (err) => {
        if (err) {
            console.log('File not sent:', err);
            res.send('File not sent');
        } else {
            console.log('File sent successfully');
        }
    });
});

app.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'html', 'signup.html'), (err) => {
        if (err) {
            console.log('File not sent:', err);
            res.send('File not sent');
        } else {
            console.log('File sent successfully');
        }
    });
});


app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'html', 'login.html'), (err) => {
        if (err) {
            console.log('File not sent:', err);
            res.send('File not sent');
        } else {
            console.log('File sent successfully');
        }
    });
});



//Creating the server
app.listen(PORT, () => {
    console.log(`server is listening on the port http://localhost:${PORT}`);
})