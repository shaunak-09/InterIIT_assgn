const express=require("express")
const router=express.Router()

const getNews=require("./controllers/getnews")
const login=require("./controllers/login")
const signup=require("./controllers/signup")


router.get("/news/",getNews);
router.post("/login",login)
router.post("/signup",signup)

module.exports=router