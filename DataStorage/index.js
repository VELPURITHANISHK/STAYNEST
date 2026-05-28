const mongoose = require("mongoose");
const totaldata = require("./data.js");
const Listing = require("../models/listing.js");

const M_URL = "mongodb://127.0.0.1:27017/STAYNEST";

async function main() {
  await mongoose.connect(M_URL);
};

main()
.then(()=>
{
    console.log("Connecting to DB");
})
.catch((err)=>
{
    console.log(err);
});

const inData = async()=>
{
    await Listing.deleteMany({});
    totaldata.data=totaldata.data.map((obj)=>({...obj,owner : "6a1011de5be7b0a17e29953f"}));
    await Listing.insertMany(totaldata.data);
    console.log("The data is inserted...");
};
inData();
