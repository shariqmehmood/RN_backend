const mongoose= require("mongoose");
const StudentScheema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    yourname:String,
    jobtitle: String,
    Price:String,
    discription:String

});

module.exports=mongoose.model("Student",StudentScheema);