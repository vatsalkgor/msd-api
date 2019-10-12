const router = require("express").Router();

router.use('/user',user);
router.use('/news',news);

module.exports = router;