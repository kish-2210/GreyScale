import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email,userId) => {
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn: maxAge})
};

export const signup = async(req,res) =>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password is required")
        }
        const exist = await User.findOne({email: email})
        if(exist){
            return res.status(406).send("User already exist, Please login");
        }
        const user =  await User.create({email,password})
        res.cookie("jwt",createToken(email,user.id),{maxAge, secure: true, sameSite: "None",});
        return res.status(201).json({
            message: "Signup Successful",
            user:{
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
        }})     
    }
    catch(error){
    console.log(`Error: ${error}`)
    return res.status(500).send("Internal Server Error")
    }
}

export const login = async(req,res) =>{
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(401).send("Email and password are required")
        }
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        const auth = await compare (password,user.password)
        if(!auth){
            return res.status(400).json({message: "Incorrect password"})
        }
        else{
            res.cookie("jwt", createToken(email,user.id), {maxAge,secure: true, sameSite: "None"})
            return res.status(201).json({
                message: "Login Successful",
                user:{
                  id: user.id,
                  email: user.email,
                  firstName: user.firstName,
                  lastName : user.lastName,
                  image: user.image,
                  color: user.color,
                }
            })
        }
        
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).send("Internal Server Error")
    }
}