const router = require('express').Router();
const { userValidationRules, validate } = require('../middleware/validator');
const tabletsController = require('../controllers/tablets');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', tabletsController.getAll);
router.get('/:id', tabletsController.getSingle);
router.post('/', isAuthenticated, userValidationRules(), validate, tabletsController.createTablet);
router.put('/:id', isAuthenticated, userValidationRules(), validate, tabletsController.updateTablet);
router.delete('/:id', isAuthenticated, tabletsController.deleteTablet);


module.exports = router;