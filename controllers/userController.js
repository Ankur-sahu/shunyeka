const { User, validateUser } = require('../modals/user');
// const { generateToken } = require('../utils/jwt');
const Joi = require('joi')

async function createUser(req, res) {
  console.log("getting req create user")
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, phone } = req.body;

  //   check user existance
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered....");

  try {
    user = new User({ name, email, phone });

    // save it on the db
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
  console.log("getting req for all users")
  const users = await User.find();//{},'name'
  return res.status(200).send({
    data: users
  });
}

async function getUser(req, res){
  console.log("getting get single user req")
  const userId = req.params.user_id;
  console.log(userId)
  const users = await User.findById(userId);

  if (!users) return res.status(404).send("User not found...");

  return res.status(200).send({
    data: users
  });
}

async function updateUser(req, res){
  console.log("getting update user req")
  const userId = req.params.user_id;
  console.log(userId)
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
  console.log("getting delete user req")
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
