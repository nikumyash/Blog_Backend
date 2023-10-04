const router = require('express').Router();
const {createPost,getPost,updatePost,deletePost,getFeed} = require('./../controllers/post.controller')
const isAuthenticated = require('./../middleware/isAuthenticated')

router.get('/feed',getFeed);
router.post('/posts/create',isAuthenticated,createPost);
router.route('/posts/:id')
    .get(getPost)
    .put(isAuthenticated,updatePost)
    .delete(isAuthenticated,deletePost);

module.exports = router;