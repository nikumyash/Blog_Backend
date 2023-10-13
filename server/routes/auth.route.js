const router = require('express').Router();
const {registerUser,loginUser,refreshAccessToken,logoutUser} = require("./../controllers/auth.controller")

router.post('/signup',registerUser);
router.post('/login',loginUser);
router.get('/refresh',refreshAccessToken);
router.put('/logout',logoutUser);

module.exports = router