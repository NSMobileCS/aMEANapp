const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
    {
        // user: {type: String, required: true},
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        _idea: {type: mongoose.Schema.Types.ObjectId, ref: 'Idea'}
    },
    {
        timestamps: true
    }
);

mongoose.model("Like", LikeSchema);