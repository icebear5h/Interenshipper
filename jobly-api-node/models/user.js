const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  interestList: {
    type: Array,
    default: []
  }
});

const User = mongoose.model("User", userSchema);

function validateAddInternship(user) {
  const schema = {
    userId: Joi.string().required(),
    internshipId: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateAddInternship = validateAddInternship;