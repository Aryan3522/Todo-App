const TodoAuthModel = require("../Models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
exports.SignUp = async (req, res) => {
  try {
    const userExist = await TodoAuthModel.findOne({ email: req.body.email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const { password } = req.body;

    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userToBeAdded = new TodoAuthModel({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await userToBeAdded.save(); // ✅ await + no argument
    console.log(savedUser);
    return res.status(201).json({
      message: "Your account has been created",
      user: savedUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Login
exports.SignIn = async (req, res) => {
  try {
    const ValidateUser = await TodoAuthModel.findOne({ email: req.body.email });

    if (!ValidateUser) {
      return res.status(404).json({
        message: "User not exists",
      });
    }

    const verify = await bcrypt.compare(
      req.body.password,
      ValidateUser.password,
    );

    if (!verify) {
      return res.status(401).json({
        message: "Wrong Password",
      });
    }

    const jwtToken = jwt.sign(
      { userId: ValidateUser._id, email: ValidateUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    return res.status(200).json({
      status: "Login Successfully",
      email: ValidateUser.email,
      Username: ValidateUser.username,
      jwtToken,
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
