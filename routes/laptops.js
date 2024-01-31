const router = require('express').Router();
const { userValidationRules, validate } = require('../middleware/validator');
const laptopsController = require('../controllers/laptops');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', laptopsController.getAll);
router.get('/:id', laptopsController.getSingle);
router.post('/', isAuthenticated, userValidationRules(), validate, laptopsController.createLaptop);

router.put('/:id', isAuthenticated, userValidationRules(), validate, laptopsController.updateLaptop);
router.delete('/:id', isAuthenticated, laptopsController.deleteLaptop);


module.exports = router;