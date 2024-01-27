const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => { 
    res.send('Project2/Electronics API'); });
router.use('/laptops', require('./laptops'));
router.use('/tablets', require('./tablets'));
// router.use('/tvs', require('./tvs'));
// router.use('/pcs', require('./pcs'));

module.exports = router;