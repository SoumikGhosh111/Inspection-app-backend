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

async function fetchAllSites(__, res) { 
    try { 
        const result = await Site.find().select("site_name location");

        if(!result) { 
            return res.status(404).json({message: "No Products Found"}); 
        }

        const sitesWithLocationString = result.map(site => {
            const location = site.location;
            const locationString = `${location.address}, ${location.city}, ${location.state}, ${location.country}- ${location.zip_code}`;
            return {...site.toObject(), location: locationString};
        });

        return res.status(200).json({message: "Saved Sites", data: sitesWithLocationString }); 

    } catch(e) { 
        return res.status(500).json({message: e.message}); 
    }
}

async function fetchProducts(req, res) {
    try {
        const id = req.params.id;

        const result = await (Site.find({_id: id})).populate("products_stored.product_id").select("products_stored");

        if(!result) { 
            return res.status(404).json({message: "No Products Found"}); 
        }

        return res.status(200).json({message: "Saved Sites", data: result});   

    } catch (e) {
        return res.status(500).json({message: e.message}); 
    }
    
}

module.exports = {createSite, fetchAllSites, fetchProducts}; 

