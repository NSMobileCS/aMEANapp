const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema(
    {
        _product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        value: {type: Number, required: true}
    },
    {
        timestamps: true
    }
);

mongoose.model("Bid", BidSchema);