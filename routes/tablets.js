const router = require('express').Router();
const { userValidationRules, validate } = require('../validator');
const tabletssController = require('../controllers/tablets');

router.get('/', tabletssController.getAll);
router.get('/:id', tabletssController.getSingle);
router.post('/', userValidationRules(), validate, tabletssController.createTablet);
router.put('/:id', userValidationRules(), validate, tabletssController.updateTablet);
router.delete('/:id', tabletssController.deleteTablet);


module.exports = router;