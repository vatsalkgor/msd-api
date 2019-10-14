const router = require("express").Router();
const User = require('../../../models/user')
let user = new User();

router.post('/login', async (req,res)=>{
    let result = await user.validateUser(req.body.username,req.body.password)
    if(result){
        res.json({
            result
        })
    }else{
        res.json({result})
    }
})

router.post('/register', async (req,res)=>{
    let rows = await user.insertUser(req.body.username,req.body.password);
    if(!rows.is_error && rows.res[0].affectedRows == 1){
        res.json({
            success:true,
            msg:"successflly inserted"
        });
    }else{
        res.json({
            success:false,
            msg:`something went wrong.${rows.error.message}`
        })
    }
})

router.get('/preference',(req,res)=>{
    res.send("Preference")
})

router.post('/preference',(req,res)=>{
    res.send("Preference")
})


module.exports = router;