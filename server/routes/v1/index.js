const router = require("express").Router();
const user = require("./user/index");
const news = require("./news/index")

router.use('/user',user);
router.use('/news',news);

module.exports = router;