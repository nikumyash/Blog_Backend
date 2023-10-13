const router = require('express').Router();
const {updateUser,getUserProfile} = require("./../controllers/user.controller")
const isAuthenticated = require('./../middleware/isAuthenticated')

router.get('/:query',getUserProfile);
router.put('/:user/update',isAuthenticated,updateUser);
// router.get('/:user/posts',getUserPosts);

module.exports = router;





