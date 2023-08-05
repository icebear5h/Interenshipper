const { Internship, validate } = require("../models/internship");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { requireSession } = require('@clerk/clerk-sdk-node');


router.get("/", async (req, res) => {
  const internships = await Internship.find().sort("name");
  res.send(internships);
});

router.post("/",  async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const internship = new Internship({
    provider: req.body.provider,
    tags: req.body.tags,
    title: req.body.title,
    pay: req.body.pay,
    requirements: req.body.requirements,
    link: req.body.link,
    publishDate: moment().toJSON()
  });
  await internship.save();

  res.send(internship);
});

router.put("/:id",  async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const internship = await Internship.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      pay: req.body.pay
    },
    { new: true }
  );

  if (!internship)
    return res.status(404).send("The Internship with the given ID was not found.");

  res.send(internship);
});

router.delete("/:id", admin, async (req, res) => {
  const internship = await Internship.findByIdAndRemove(req.params.id);

  if (!internship)
    return res.status(404).send("The Internship with the given ID was not found.");

  res.send(internship);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const internship = await Internship.findById(req.params.id);

  if (!internship)
    return res.status(404).send("The Internship with the given ID was not found.");

  res.send(internship);
});

module.exports = router;
