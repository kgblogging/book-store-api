const User = require("../models/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the password is correct
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token expiration time
        );

        // Respond with token and user details
        res.status(200).json({
            status: "Success",
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const register = async (req, res, next) => {
    const { name, email, password, gender, dob } = req.body;
    try {
        if (!name || !email || !password || !gender || !dob) {
            return res.status(400).json({ message: "All fields are required." });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Create new user
        const newUser = new User({ name, email, password, gender, dob });
        await newUser.save();

        // Success response
        return res.status(201).json({ status: "Success", message: "User registered successfully.", user: newUser });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.user.userId);
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: "Old password is incorrect." });
        }
        if (newPassword !== confirmPassword) {
            return res
                .status(400)
                .json({ status: false, message: "New password and confirmation do not match." });
        }
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({ status: true, message: "Password changed successfully." });
    } catch (error) {
        next(error);
    }

}
const refreshToken = async (req, res, next) => {

}
const verifyToken = async (req, res, next) => {

}
module.exports = { login, register, changePassword, refreshToken, verifyToken }
