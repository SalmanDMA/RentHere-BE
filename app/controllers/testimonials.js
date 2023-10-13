const asyncHandler = require('express-async-handler');
const {
  createTestimonialUser,
  findAllTestimonials,
  createTestimonialAdmin, findByIdTestimonial, updateTestimonial, deleteTestimonial,
} = require('../services/testimonials');

const createNewTestimonialUser = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const testimonial = await createTestimonialUser(userId, req.body);
  res.status(201).json({
    status: 'success',
    message: 'Testimonial created',
    data: testimonial,
  });
});

const createNewTestimonialAdmin = asyncHandler(async (req, res) => {
  const { role } = req.user;
  const testimonial = await createTestimonialAdmin(role, req.body);
  res.status(201).json({
    status: 'success',
    message: 'Testimonial created',
    data: testimonial,
  });
});

const findAll = asyncHandler(async (req, res) => {
  const testimonials = await findAllTestimonials();
  res.status(200).json({
    status: 'success',
    message: 'List of all testimonials',
    data: testimonials,
  });
});

const findById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const testimonial = await findByIdTestimonial(id, role);
  res.status(200).json({
    status: 'success',
    message: 'Testimonial found',
    data: testimonial,
  });
});

const updateTestimonialHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  await updateTestimonial(id, role, req.body);
  res.status(200).json({
    status: 'success',
    message: `Testimonial with id ${id} updated`,
  });
});

const deleteTestimonialHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  await deleteTestimonial(id, role);
  res.status(200).json({
    status: 'success',
    message: `Testimonial with id ${id} deleted`,
  });
});

module.exports = {
  createNewTestimonialUser,
  createNewTestimonialAdmin,
  findAll,
  findById,
  updateTestimonialHandler,
  deleteTestimonialHandler,
};
