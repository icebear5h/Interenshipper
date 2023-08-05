const { requireSession } = require('@clerk/clerk-sdk-node');
const { User, validateAddInternship } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/me", async (req, res) => {
  const user = await User.findById(req.session.userId).select("-password");
  res.send({'user':user});
});

router.post("/me/interestList" ,async (req,res) => {
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

router.post("/me/deleteFromInterestList", async (req,res) => {
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
