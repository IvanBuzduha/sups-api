const express = require('express');
const router=express.Router();
const superheroController = require('../controllers/superhero-controls');
const uploadImg = require('../helpers/upload');


router.get('/', superheroController.getSuperherosList);

router.get('/:id', superheroController.getSuperheroById);

router.post('/create',superheroController.addSuperhero);

router.delete('/:id', superheroController.removeSuperhero);

router.patch('/:id',superheroController.updateSuperhero);

router.patch('/upload',  uploadImg.single('image'), superheroController.updateImg); 

module.exports = router;
