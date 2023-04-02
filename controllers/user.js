import { User } from "../models/user.js";
import bcrypt from "bcrypt";

import { sendcookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";


export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if(!user) return next(new ErrorHandler("Invalid Email or Password",400));

 const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) return next(new ErrorHandler("invalid Emial or password",400));

  sendcookie(user, res, `WELCOE BACK ,${user.name}`, 200);
};






export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

    if(user) return next(new ErrorHandler("User already exists",400));

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendcookie(user, res, "Registered SUccessfully", 201);
};




export const getMyProfile = (req, res) => {
  res.status(200).json({
    sucess: true,
    user: req.user,
  });
};


export const logout =  (req, res) => {
       
    res.status(200).cookie("token",null,{
      expires:new Date(Date.now())
    }).json({
      sucess: true,
      message: "Successfully Loggedout ",
    });
}