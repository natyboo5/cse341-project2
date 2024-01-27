const router = require('express').Router();
const { userValidationRules, validate } = require('../validator');
const laptopsController = require('../controllers/laptops');

router.get('/', laptopsController.getAll);
router.get('/:id', laptopsController.getSingle);
router.post('/', userValidationRules(), validate, laptopsController.createLaptop);
// router.post('/', laptopsController.createLaptop);
router.put('/:id', userValidationRules(), validate, laptopsController.updateLaptop);
router.delete('/:id', laptopsController.deleteLaptop);


module.exports = router;