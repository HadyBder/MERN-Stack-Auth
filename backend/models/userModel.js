const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("Ta3a 3abiyon kellon yala");
  }
  if (!validator.isEmail(email)) {
    throw Error("7et email mnih, please");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("7ada already akhado hah hah hah haarraaammm");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("7abeb tethakkar? Zabbet l password");
  }

  const salt = await bcrypt.genSalt(10);
  // the higher this number is, the safer, but needs time
  // mypasswordj928j39238
  // mypassword0923842389
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
