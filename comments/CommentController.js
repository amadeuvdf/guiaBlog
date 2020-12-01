const express = require('express');
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("../articles/Article");
const Comment = require("./Comment")

router.post("/comment/save", (req, res) => {
    var name = req.body.name;
    var body = req.body.body;
    var article = parseInt(req.body.article);

    //console.log(typeof(category));

    if(article != null){
        Comment.create({
            name: name,
            body: body,
            articleId: article
        }).then(()=>{
            res.redirect("/");
        });
    }else{
        res.redirect("/");
    }
});



module.exports = router;