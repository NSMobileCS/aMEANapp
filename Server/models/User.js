const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, minlength: 3, unique: true},
        ideas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Idea'}],
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Like'}]
    },
    {
        timestamps: true
    }
);

mongoose.model("User", UserSchema);