import '../../Database/connection'
const User = require('../../Models/userModel')
const bcrypt = require('bcrypt')
const saltRounds = 10
const Token = require('../../Models/tokenModel')
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')
const crypto = require('crypto')
import cookie from 'cookie'

export default async function handler(req, res) {

  if (req.method === "POST") {
    const { username, email, password } = req.body

    if (username && email && password) {
      let userExists = await User.findOne({ username })
      if (userExists) {
        return res.status(400).json({ error: "Username not available." })
      }

      userExists = await User.findOne({ email })
      if (userExists) {
        return res.status(400).json({ error: "Email already registered" })
      }

      let salt = await bcrypt.genSalt(saltRounds);
      let hashed_password = await bcrypt.hash(password, salt)

      let newUser = await User.create({
        username,
        email,
        password: hashed_password
      });

      if (!newUser) {
        return res.status(400).json({ error: "Something went wrong" })
      }

      let token = await Token.create({
        token: crypto.randomBytes(16).toString('hex'),
        user: newUser._id
      });

      if (!token) {
        return res.status(400).json({ error: "Something went wrong" })
      }

      res.send(newUser)
    }


    else if (email && password) {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ error: "Email not registered" })
      }

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        return res.status(400).json({ error: "Invalid Password or Password does not match" })
      }
      if (!user.isVerified) {
        return res.status(400).json({ error: "User not verified. Contact Administrator!" })
      }


      const { _id } = user

      console.log(user, "USER")
      console.log("process.env.JWT_SECRET")
      let token = jwt.sign({
        _id,
        email,
        user

      }, process.env.JWT_SECRET)

      console.log(token, "TOKENNNNNN")
      res.setHeader('Set-Cookie', cookie.serialize('myCookie', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 86400,
        sameSite: 'strict',
        path: '/'
      }));
      // res.cookie('myCookie', token, { expire: 86400 })
      res.send({ token, user: { _id, email } })
    } else {
      return res.status(400).json({ error: "Invalid request parameters." })
    }
  } else if (req.method === "GET") {
    let users = await User.find()

    if (!users) {
      return res.status(400).json({ error: "Something went wrong" })
    }

    res.send(users);
  } else if (req.method === "PATCH") {
    let userUpdate = await User.findByIdAndUpdate(req.query.id, {
      isVerified: true
    }, { new: true })

    if (!userUpdate) {
      return res.status(400).json({ error: "Something went wrong, couldn't update!" })
    }
    res.send(userUpdate)

  }

  else {
    res.status(405).json({ error: "Method not allowed" })
  }
  // catch (error) {
  //   console.error("Error in handler:", error);
  //   res.status(500).json({ error: "Internal server error" })
  // }
}