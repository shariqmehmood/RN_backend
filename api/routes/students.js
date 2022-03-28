const express = require("express");
const router = express.Router();
const Student = require("../model/StudentScheema")
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
    Student.find()
        .then(result => {
            console.log(result.length)
            res.send(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post("/", (req, res, next) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        yourname: req.body.yourname,
        jobtitle: req.body.jobtitle,
        Price: req.body.Price,
        discription: req.body.discription


    })
    student.save()

        .then(result => {
            console.log(result)
            res.status(200).json({
                success: true,
                message: "This is student post request"
            })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                error: err
            })
        })


})
// <-----Get Data By ID----->
router.get('/:id', (req, res, next) => {
    let getid = req.params.id;
    console.log(getid)
    Student.findById(getid)
        .then(result => {
            res.status(200).json({
                OneProduct: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})
// <-----delete request ---->
router.delete("/:id", async (req, res) => {
    let getdeleteID = req.params.id;
    try {
        await Student.deleteOne({ _id: getdeleteID })
        return res.status(200).json({
            message: "student deleted"
        })
    } catch (err) {
        return res.status(500).json({
            masg: false,
            error: err,
        })
    }
}
)
// <-----Update ----->
router.put('/:id', (req, res) => {
    // console.log(req.params.id)
    Student.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            yourname: req.body.yourname,
            jobtitle: req.body.jobtitle,
            Price: req.body.Price,
            discription: req.body.discription
        }
    })
        .then(result => {
            res.status(200).json({
                message: "user update"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "user not update"
            })
        })
})





module.exports = router;
