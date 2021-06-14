const express = require('express');


const { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace } = require('../controllers/places-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();



router.get('/:pid', getPlaceById);
 
router.get('/user/:uid', getPlacesByUserId);

router.use(checkAuth);

router.post('/', fileUpload.single('image'), createPlace);

router.patch('/:pid', updatePlace);

router.delete('/:pid', deletePlace);

module.exports = router;