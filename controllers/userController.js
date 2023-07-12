const { User, validateUser } = require('../modals/user');
const Joi = require('joi')

async function createUser(req, res) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { name, email, phone } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered....");

  try {
    user = new User({ name, email, phone });
    const newUser = await user.save();
    return res.status(201).send({
      name: newUser.name,
      email: newUser.email,
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong...",
      error: err.message,
    });
  }
}

async function getUsers(req, res){
  const users = await User.find({},'name');
  return res.status(200).send({
    data: users
  });
}

async function getUser(req, res){
  const userId = req.params.user_id;
  const users = await User.findById(userId);
  if (!users) return res.status(404).send("User not found...");
  return res.status(200).send({
    data: users
  });
}

async function updateUser(req, res){
  const userId = req.params.user_id;
  const user = await User.findById(userId);
  if (!user) return res.status(404).send("User not found...");
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name: req.body.name, email: req.body.email, phone: req.body.phone },
    { new: true }
  )
  return res.status(200).send({
    data: updatedUser
  });

}

async function deleteUser(req, res){
  const userId = req.params.user_id;
  const user = await User.findById(userId);
  if (!user) return res.status(404).send("User not found...");
  const deletedUser = await User.findByIdAndDelete(userId);
  return res.status(200).json({
    msg: "user deleted successfully",
    data: deletedUser,
  });
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
