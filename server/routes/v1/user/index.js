const router = require("express").Router();
const {UserModel} = require('../../../models')
router.post('/Login',(req,res)=>{
    res.send("Login")
})

router.post('/Register',(req,res)=>{
    res.send("Register")
})

router.put('/Preference',(req,res)=>{
    res.send("Preference")
})

module.exports = router;