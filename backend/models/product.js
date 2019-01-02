var mongoose = require('mongoose');

var config = require('../config/database');

var schema = mongoose.Schema;

var productSchema =mongoose.Schema({
    name:{
        type:String
    },
    img : {
        type: String
    },
    description: {
        type: String
    },
    Catag: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);

module.exports.addProduct = function(newProduct, callback) {
    newProduct.save(callback);
}

module.exports.editProduct = function(oldProductID,newProduct, callback) {
    var query = { _id: oldProductID }
    Product.findByIdAndUpdate(query, callback);
} 

module.exports.removeProduct = function(productID, callback) {
    var query = { _id:productID };
    Product.remove(query, callback)
}