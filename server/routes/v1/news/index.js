const router = require("express").Router();

router.get('/:user',(req,res)=>{
    //DB call here to get user preference

    //call to newsapi.org

    //above calls can be made asynchronously

    //filter news here according to preference

    //call to summarization api

    //return response of json of all the news. 
})

module.exports = router;