const express = require('express');
const {
  createNewTestimonialUser,
  findAll, findById, updateTestimonialHandler, deleteTestimonialHandler, createNewTestimonialAdmin,
} = require('../controllers/testimonials');
const { authCheck, adminCheck } = require('../middleware/authCheck');

const router = express.Router();

router.get('/testimonials', findAll);
router.post('/testimonials', authCheck, createNewTestimonialUser);
router.post('/testimonials', authCheck, adminCheck, createNewTestimonialAdmin);
router.get('/testimonials/:id', authCheck, adminCheck, findById);
router.put('/testimonials/:id', authCheck, adminCheck, updateTestimonialHandler);
router.delete('/testimonials/:id', authCheck, adminCheck, deleteTestimonialHandler);

module.exports = router;
