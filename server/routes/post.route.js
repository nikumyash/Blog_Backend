const router = require('express').Router();
const {createPost,getPost,updatePost,deletePost,getFeed} = require('./../controllers/post.controller')
const isAuthenticated = require('./../middleware/isAuthenticated')

router.get('/',getFeed);
router.post('/create',isAuthenticated,createPost);
router.get('/:id',getPost);
router.put('/:id',isAuthenticated,updatePost);
router.delete('/:id',isAuthenticated,deletePost);

module.exports = router;