const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateAddInternship } = require("../models/user");
const {Internship} = require("../models/internship");
const express = require("express");
const { not } = require("joi/lib/types/lazy");
const router = express.Router();

router.post("/me", auth, async (req, res) => {
  const user = await User.findById(req.body.userId).select("-password");
  res.send({'user':user});
});


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/me/interestList", auth ,async (req,res) => {
  const { error } = validateAddInternship(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findById(req.body.userId);
  const internship = req.body.internshipId;
  if(user.interestList && user.interestList.includes(internship)) {
    res.status(400)
    res.send(user);
    return;
  }
  if(user.interestList) user.interestList.push(internship);
  else user.interestList =  [internship];
  user.save();
  res.status(200);
  res.send(user);
});

router.post("/me/deleteFromInterestList", auth ,async (req,res) => {
  const { error } = validateAddInternship(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findById(req.body.userId);
  const internship = req.body.internshipId;
  if(!user.interestList.includes(internship)) {
    res.status(400)
    res.send(user);
  }
  user.interestList.remove(internship);
  user.save();
  res.status(200);
  res.send(user);
});

module.exports = router;
