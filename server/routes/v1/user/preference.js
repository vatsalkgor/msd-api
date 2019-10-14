const router = require("express").Router();
const User = require("../../../models/user")
const user = new User();
router.get('/',async (req,res)=>{
    let results = await user.getPreference(req.query.id);
    res.json(results)
})

router.post('/',async (req,res)=>{
    let results = await user.insertPreference(req.body);
    if(results.affectedRows > 0){
        res.json({
            success:true,
            msg:"Preference added."
        })
    }else{
        res.json({
            success:false,
            msg: "something went wrong. "
        })
    }
})
module.exports = router;