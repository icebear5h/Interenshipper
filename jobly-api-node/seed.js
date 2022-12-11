const { Genre } = require("./models/genre");
const { Internship } = require("./models/internship");
const mongoose = require("mongoose");
const config = require("config");
const fs = require("fs");
const csv = require('fast-csv');
const { getSystemErrorMap } = require("util");


async function seed() {
  await mongoose.connect(config.get("db"));
  await Internship.deleteMany({});
  await Genre.deleteMany({});
  
  let csvData = [];
  
  await fs.createReadStream('./internships.csv')
  .pipe(csv.parse({ headers: true }))
  .on('error', error => console.error(error))
  .on('data', (row) => csvData.push(row))
  .on('end', async () => {
    for (const rows of csvData){
        const internship = new Internship(rows);
        internship.tags=rows.tags.split(",").filter(element =>  {
          return element !== "";
        });
        internship.requirements=rows.requirements.split(",").filter(element =>  {
          return element !== "";
        });
        console.log(internship);
        await internship.save();
      }
    
    mongoose.disconnect();
      
    console.info("Done!");
  });
  }
    
  seed();
