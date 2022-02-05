const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const assetSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    assetName: {
        type: String,
        required: true,
        trim: true,
        maxlength:60,
    },
    assetDsc: {
        type: String,
        trim: true,
        maxlength: 250
    },
    assetPrice: {
        type: Number,
        required: true,
    },
    assetCategory: {
        type: ObjectId,
        required: true,
        ref: 'Category',
    },
    assetQty: {
        type: Number,
        required: true,
    },
}, { timestamps: true});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;