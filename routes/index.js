const router = require('express').Router();

// router.use('/', require('./swagger'));
router.use('/laptops', require('./laptops'));
// router.use('/tvs', require('./tvs'));
// router.use('/tablets', require('./tablets'));
// router.use('/pcs', require('./pcs'));

module.exports = router;