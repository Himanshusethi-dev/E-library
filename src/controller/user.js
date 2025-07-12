import createHttpError from "http-errors";
import User from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, name, password } = req.body;

    // Basic input validation (optional but recommended)
    if (!email || !name || !password) {
      return next(createHttpError(400, "Email, name, and password are required"));
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    console.log("emailExists", emailExists);
    if (emailExists) {
      return next(createHttpError(400, "A user with this email already exists"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { sub: newUser._id },
      config.secret_key,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    // Send success response
    res.status(201).json({ accessToken: token });
  } catch (error) {
    console.error("Error creating user:", error);
    next(createHttpError(500, "Something went wrong while creating the user"));
  }
};

const loginUser  = async (req,res,next)=> {

    const {email,password} = req.body;

    if(!email || !password){
        return  next(createHttpError(400,'Please fill the required fields'));
    }

  const user = await  User.findOne({
        email : email
    })

    if(!user){
        res.status(404).json({message : 'User not found'})
        return next(createHttpError(404,'User with this email does not exist'))
    }

    console.log('user',user);

    const isVerified = await bcrypt.compare(password,user.password)

    console.log('isVerified',isVerified === true ?'Verified' : 'Not verified')
    if(!isVerified){
            return next(createHttpError(400,'Wrong credentials'))
    }

 const token = jwt.sign(
      { sub: user._id },
      config.secret_key,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

        res.json({accessToken : token})

}

export { createUser, loginUser};
