const Asset = require('../models/Asset');

exports.create = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    console.log(req.user);

    const { filename } = req.file;
    const { assetName, assetDsc, assetPrice, assetCategory, assetQty } = req.body;

    try {
        let asset = new Asset();
        asset.fileName = filename;
        asset.assetName = assetName;
        asset.assetDsc = assetDsc;
        asset.assetPrice = assetPrice;
        asset.assetCategory = assetCategory;
        asset.assetQty = assetQty;
    
        await asset.save();
    
        res.json({
            successMessage: `${assetName} successfully created`,
            asset
        }); 
    } catch (err) {
        res.status(500).json({
            errorMessage: 'Please try again later on'
        });
    }
}