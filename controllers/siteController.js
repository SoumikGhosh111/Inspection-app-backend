const Site = require("../models/site.model"); 


async function createSite(req, res) { 
    const {site_name, location, manager, storage_capacity, products_stored} = req.body; 
    try{ 
        if(!site_name || !location || !manager || !storage_capacity || !products_stored){ 
            return res.status(400).json({message: "All required fields must be provided"}); 
        }

        const newSite = new Site({ 
            site_name: site_name, 
            location: location, 
           manager: manager, 
            storage_capacity: storage_capacity, 
            products_stored: products_stored, 
        }); 


        const savedSite = await newSite.save(); 

        return res.status(200).json({message: "Site Created Successfully"}); 
    }catch(e){ 
        return res.status(500).json({message: e.message}); 
    }
}

async function fetchAllSites(__, res){ 
    try{ 
        const result = await ((Site.find()).populate("products_stored.product_id")); 

        if(!result){ 
            return res.status(404).json({message: "No Sites Found"}); 
        }

        return res.status(200).json({message: "Saved Sites", data: result}); 

    }catch(e){ 
        return res.status(500).json({message: e.message}); 
    }
}
 
module.exports = {createSite, fetchAllSites}; 
