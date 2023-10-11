const router = require('express').Router();
const {registerUser,loginUser,updateUser,logoutUser,getUserProfile,getUserPosts} = require("./../controllers/user.controller")
const isAuthenticated = require('./../middleware/isAuthenticated')

router.get('/:query/profile',getUserProfile);
router.post('/auth/signup',registerUser);
router.post('/auth/login',loginUser);
// router.post('/auth/logout',logoutUser);
router.put('/:user/update',isAuthenticated,updateUser);
router.get('/:user/posts',getUserPosts);

module.exports = router;





