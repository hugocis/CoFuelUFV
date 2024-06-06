const express = require('express');
const { addVehicle, listVehicles, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, addVehicle);
router.get('/:userId', verifyToken, listVehicles);
router.put('/:id', verifyToken, updateVehicle);
router.delete('/:id', verifyToken, deleteVehicle);

module.exports = router;
