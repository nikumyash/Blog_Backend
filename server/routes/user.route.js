const router = require('express').Router();
const {registerUser,loginUser,updateUser,logoutUser,getUserProfile,getUserPosts} = require("./../controllers/user.controller")
const isAuthenticated = require('./../middleware/isAuthenticated')

router.get('/profile/:query',getUserProfile);
router.post('/signup',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.put('/update',isAuthenticated,updateUser);
router.get('/:user/posts',getUserPosts);

module.exports = router;





