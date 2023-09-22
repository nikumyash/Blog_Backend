const router = require('express').Router();
const {fetchTags,getTagPosts} = require('./../controllers/tag.controller');

router.get('/',fetchTags);
router.get('/:query',getTagPosts);


module.exports=  router;