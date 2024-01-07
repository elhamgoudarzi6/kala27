const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CatalogSchema = new Schema({
    path: { type: String}
});
module.exports = mongoose.model('Catalog', CatalogSchema);