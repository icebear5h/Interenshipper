const Joi = require('joi');
const mongoose = require('mongoose');

const paySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const Pay = mongoose.model('Pay', paySchema);

function validatePay(pay) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(pay, schema);
}

exports.genreSchema = paySchema;
exports.Pay = Pay; 
exports.validate = validatePay;