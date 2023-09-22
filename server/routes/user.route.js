const router = require('express').Router();
const {registerUser,loginUser,updateUser,logoutUser,getUserProfile} = require("./../controllers/user.controller")
const isAuthenticated = require('./../middleware/isAuthenticated')

router.get('/profile/:query',getUserProfile);
router.post('/singup',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.put('/update/:id',isAuthenticated,updateUser);

module.exports = router;





