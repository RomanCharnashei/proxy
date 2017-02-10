let express = require('express');
let router = express.Router();

router.use("/setup-main", require("./setup-main"));


module.exports = router
