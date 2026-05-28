const Listing = require("./models/listing");
const Review=require("./models/reviews");
const ExpressError = require("./utils/Expresserros.js");
const {ListingSchema,reviewSchema}=require("./schema.js");

// module.exports.isLoggedIn= (req,res,next)=>{
//     if(!req.isAuthenticated())
//     {
//         req.session.redirectUrl = req.originalUrl;
//         req.flash("error","Please login to create a listing!");
//         return res.redirect("/login");
//     }
//     next();
// };

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){

        // Save only normal page URLs
        if(req.method==="GET"){
            req.session.redirectUrl=req.originalUrl;
        }

        req.flash("error","Please login to continue!");

        return res.redirect("/login");
    }

    next();
};


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing =  await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){ 
        req.flash("error","You are not the owner for this listing !");
        return res.redirect(`/listing/${id}`);
        
    }

    next();
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review =  await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){ 
        req.flash("error","You are not the author of this review !");
        return res.redirect(`/listing/${id}`);
        
    }

    next();
};

module.exports.validaeListing =(req,res,next)=>
{
    let {error} = ListingSchema.validate(req.body);
    if(error)
    {
        let errMsg = error.details.map(el => el.message).join(",");
         throw new ExpressError(404,errMsg);
    }else{
        next();
    }
};

module.exports.validaeReview =(req,res,next)=>
{
    let {error} = reviewSchema.validate(req.body);
    if(error)
    {
        let errMsg = error.details.map(el => el.message).join(",");
         throw new ExpressError(404,errMsg);
    }else{
        next();
    }
}

module.exports.validateReview2 = (req,res,next)=>{

    let { error } = reviewSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map(el => el.message).join(",");

        req.flash("error","Please give rating!");

        return res.redirect(`/listing/${req.params.id}`);
    }

    next();

}