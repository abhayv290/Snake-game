// Middleware to check if user is logged in
const isLogin = async (req, res, next) => {
    if (req.session && req.session.id) {
        req.UserId = req.session.id;
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

export default isLogin