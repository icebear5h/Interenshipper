const Joi = require('joi');
const string = require('joi/lib/types/string');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const {paySchema} = require('./pay');


const Internship = mongoose.model('Internships', new mongoose.Schema({
  provider: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 1,
    maxlength: 255
  },
  tags: { 
    type: Array,  
    required: true
  },
  pay: {
    type: String,
    reqiured: true,
  },
  requirements: {
    type: Array,
    required: true
  },
  link: {
    type: String,
    required: true,
  }
}));

function validateInternship(internship) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
  };

  return Joi.validate(internship, schema);
}

exports.Internship = Internship; 
exports.validate = validateInternship;