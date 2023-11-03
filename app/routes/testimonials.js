const express = require('express');
const {
  createNewTestimonialUser,
  findAll, findById,
  deleteTestimonialHandler,
  createNewTestimonialAdmin, updateTestimonialHandlerAdmin, updateTestimonialHandlerUser,
} = require('../controllers/testimonials');
const { authCheck, adminCheck } = require('../middleware/authCheck');
const { validateCreateTestimonial } = require('../validator/testimonial/CreateTestimonial');
const { validateUpdateTestimonial } = require('../validator/testimonial/UpdateTestimonial');

const router = express.Router();

router.get('/testimonials', findAll);
router.post('/testimonials', authCheck, validateCreateTestimonial, createNewTestimonialUser);
router.post('/testimonials/admin', authCheck, adminCheck, validateCreateTestimonial, createNewTestimonialAdmin);
router.get('/testimonials/:id', authCheck, adminCheck, findById);
router.put('/testimonials/:id', authCheck, validateUpdateTestimonial, updateTestimonialHandlerUser);
router.put('/testimonials/admin/:id', authCheck, adminCheck, validateUpdateTestimonial, updateTestimonialHandlerAdmin);
router.delete('/testimonials/:id', authCheck, adminCheck, deleteTestimonialHandler);

module.exports = router;
