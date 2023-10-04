const router = require('express').Router();
const {createCategory,getCategories,updateCategories,deleteCategories,getPostsbyCategory,getCategoriesAdmin} = require('../controllers/category.controller');
const isAuthenticated = require('./../middleware/isAuthenticated');

router.post('/create',isAuthenticated,createCategory);
router.get('/',getCategories);
router.get('/admin/',isAuthenticated,getCategoriesAdmin);
router.delete('/:id',isAuthenticated,deleteCategories);
router.put('/:id',isAuthenticated,updateCategories);
router.get("/:cat",getPostsbyCategory);

module.exports=  router;