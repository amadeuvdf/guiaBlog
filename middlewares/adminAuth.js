function adminAuths(req, res, next) {
    if (req.session.user != undefined){
        next();
    }else{
        res.redirect("/");
    }
}

module.exports = adminAuths;