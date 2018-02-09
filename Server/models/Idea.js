const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema(
    {
        body: {type: String, required: true, minlength: 3},
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Like'}]
    },
    {
        timestamps: true
    }
);

IdeaSchema.virtual('likeCount').get(
    function() {
        let rVal = 0
        if (this.likes) {
            this.likes.forEach(
                (_) => rVal += 1
            );
        }
        return rVal;
    }
);
IdeaSchema.set('toJSON', {virtuals: true});
IdeaSchema.set('toObject', {virtuals: true});

mongoose.model("Idea", IdeaSchema);