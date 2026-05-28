const Listing = require("../models/listing");
const axios=require("axios");



module.exports.index=async(req,res)=>
{     
    const alllistings=await Listing.find();
    res.render("listings/index.ejs",{alllistings});
};

module.exports.rendernewform = (req,res)=>
{
    res.render("listings/new.ejs")
};

module.exports.showListing=async(req,res)=>
{
    let {id}=req.params;
    const showing= await Listing.findById(id).populate({
    path:"reviews",
    populate:{
        path:"author"
    }
})
    .populate("owner");
    if(!showing)
    {
        req.flash("error","Listing unavailable. Please check and try again !");
        return res.redirect("/listing");
    }
    res.render("listings/show.ejs",{showing,googleApiKey:
process.env.GOOGLE_MAPS_KEY});

};

module.exports.createListing=async(req,res,next)=>
{ 

    // console.log(req.file)
    let url=req.file.secure_url;
    let filename=req.file.filename;
    let newlisting=req.body.listing;
    newlisting.owner = req.user._id;

     // LOCATION -> COORDINATES
    const geoData = await axios.get(
        "https://us1.locationiq.com/v1/search",
        {
            params: {
                key: process.env.LOCATIONIQ_KEY,
                q: newlisting.location,
                format: "json"
            }
        }
    );

        newlisting.geometry = {
        type: "Point",
        coordinates: [
            Number(geoData.data[0].lon), // longitude first
            Number(geoData.data[0].lat)  // latitude second
        ]
    };

    const add= new Listing(newlisting);
    add.image={url,filename};

    await add.save();
    req.flash("success","New Listing Created !");
    res.redirect("/listing"); 
    
   
};

module.exports.editListing=async(req,res)=>
{
    let{id} =req.params;
    const edetails= await Listing.findById(id);
     if(!edetails)
    {
        req.flash("error","Listing unavailable. Please check and try again !");
        return res.redirect("/listing");
    }
    let orgImageUrl = edetails.image.url;
    orgImageUrl=orgImageUrl.replace("/upload","/upload/w_250");

    res.render("listings/edit.ejs",{edetails,orgImageUrl});
};

// module.exports.updateListing=async(req,res)=>
// {
    
//     let {id}=req.params;
    
//     let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     if(typeof req.file != "undefined")
//     {
//     let url=req.file.secure_url;
//     let filename=req.file.filename;
//     listing.image={url,filename};
//     await listing.save();
//     }
//     req.flash("success","Listing Updated !");
//     res.redirect(`/listing/${id}`);
// };


module.exports.updateListing = async(req,res)=>
{
    let { id } = req.params;

    let updatedData = req.body.listing;

    // Update location → coordinates
    if(updatedData.location){

        const geoData = await axios.get(
        "https://us1.locationiq.com/v1/search",
        {
            params:{
                key: process.env.LOCATIONIQ_KEY,
                q: updatedData.location,
                format:"json"
            }
        });

        updatedData.geometry = {
            type:"Point",
            coordinates:[
                Number(geoData.data[0].lon),
                Number(geoData.data[0].lat)
            ]
        };
    }

    let listing =
    await Listing.findByIdAndUpdate(
        id,
        updatedData,
        { new:true }
    );

    if(req.file){
        let url = req.file.secure_url;
        let filename = req.file.filename;

        listing.image = { url, filename };

        await listing.save();
    }

    req.flash("success","Listing Updated !");
    res.redirect(`/listing/${id}`);
};

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
     req.flash("success","Listing Deleted!");
    res.redirect("/listing");
};


//my listings
module.exports.myListings = async (req, res) => {

    const listings = await Listing.find({
        owner: req.user._id
    });

    res.render("mylistings/listingdetails.ejs", {listings,page: "listings"});
};