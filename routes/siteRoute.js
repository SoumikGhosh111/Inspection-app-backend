const express = require("express"); 

router = express.Router(); 

const {createSite, fetchAllSites} = require("../controllers/siteController"); 

router.post("/create-site", createSite); 
router.get("/fetch-all-sites", fetchAllSites); 

module.exports = router; 
