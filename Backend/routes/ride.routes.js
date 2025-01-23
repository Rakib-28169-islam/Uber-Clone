const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');
const { query,body } = require('express-validator');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)
router.get('/get-fare',
    authMiddleware.authUser,
    query('origin').isString().isLength({min:3}).withMessage('pickup(Origin) field must be greater or equal 3  Invalid address'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination address ride routes line 17'),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authDriver,
    body('rideId').isMongoId().withMessage('Invalid ride id on ride routes line 23'),
    rideController.confirmRide


)
module.exports = router;

