const router = require('express').Router();
const {createCategory,getCategories,updateCategories,deleteCategories,getPostsbyCategory} = require('../controllers/category.controller');
const isAuthenticated = require('./../middleware/isAuthenticated');

router.post('/create',isAuthenticated,createCategory);
router.get('/',getCategories);
router.delete('/:id',isAuthenticated,deleteCategories);
router.put('/:id',isAuthenticated,updateCategories);
router.get("/:cat",getPostsbyCategory)

module.exports=  router;