const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
// router.get('/', (req, res) => { 
//     res.send('Project2/Electronics API'); });
router.use('/laptops', require('./laptops'));
router.use('/tablets', require('./tablets'));
// router.use('/tvs', require('./tvs'));
// router.use('/pcs', require('./pcs'));

router.get('/login', passport.authenticate('github'), (req,res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;