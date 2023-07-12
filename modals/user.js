const mongoose = require('mongoose')
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
})

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
    });
  
    return schema.validate(user);
  };

  module.exports = {
    User,
    validateUser,
  };