const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, minlength: 2},
        bids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bid'}]
    },
    {
        timestamps: true
    }
);

mongoose.model("Product", ProductSchema);