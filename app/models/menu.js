const mongose = require('mongoose');


const menuschema = new mongose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },

})

module.exports = mongose.model('Menu', menuschema);
