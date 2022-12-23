const express = require("express");
const { getWords, getRank } = require("../controllers/main");
const router = express.Router();

router.get("/words", getWords);
router.post("/rank", getRank);
module.exports = router;
