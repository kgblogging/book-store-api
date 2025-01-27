const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const hashPassword = require("../middleware/hashPassword")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  role: {
    type: String,
    enum: ["admin", "user", "superadmin"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "disabled"],
    default: "active",
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Attach the pre-save middleware
userSchema.pre("save", hashPassword);

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
