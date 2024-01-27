const router = require('express').Router();
const { userValidationRules, validate } = require('../validator');
const tabletsController = require('../controllers/tablets');

router.get('/', tabletsController.getAll);
router.get('/:id', tabletsController.getSingle);
router.post('/', userValidationRules(), validate, tabletsController.createTablet);
router.put('/:id', userValidationRules(), validate, tabletsController.updateTablet);
router.delete('/:id', tabletsController.deleteTablet);


module.exports = router;