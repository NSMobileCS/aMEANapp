const mongoose = require('mongoose');

const Idea = mongoose.model('Idea');
const Like = mongoose.model('Like');
const User = mongoose.model('User');





module.exports = {

    //post to login
    login: function (req, res) {
        let userName = req.body.name;
        console.log(userName);
        User.findOne(
            {'name': userName},
            (err, user) => {
                if (user) {
                    console.log(`existing user ${user.name}, ${user._id} found` );
                    req.session.user = {
                        name: user.name,
                        id: user._id
                    };
                    return res.json(req.session.user);
                } else {
                    user = User( {'name': userName} );
                    user.save(
                        (err, user) => {
                            if (user) {
                                console.log(`new user ${user.name}, ${user._id} added` );
                                req.session.user = {
                                    name: user.name,
                                    id: user._id
                                };
                                return res.json(req.session.user);
                            }
                            if (err) return res.json(err);
                        }
                    )
                }

            }
        );
    },

    logout: function(req, res) {
        req.session.destroy( () => res.json({'ok':true}) )
    },

    users: function (req, res) {
        User.find(
            {},
            (err, users) => {
                if (err) {
                    return res.json(err);
                } else {
                    return res.json(users);
                }
            }
        )
    },

    getUser: function (req, res) {
        if (req.session.user && req.session.user.name && req.session.id ) {
            return res.json(req.session.user);
        } else {
            return res.status(400).json({errors: ["not logged in"]});
        }
    },

    viewUser: function (req, res) {
        User.findById(req.params.id).populate({
            path: 'likes',
            populate: {path: '_idea'}
        }).exec(
            (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(400).json(err);
                } else {
                    res.json(user);
                }
            }
        )
    },

    ideas: function (req, res) {
        Idea.find({}).populate('_user').exec(
            (err, ideas) => {
                if (err) {
                    return res.json(err);
                } else {
                    return res.json(ideas);
                }
            }
        );
    },

    oneIdea: function (req, res) {
        Idea.findOne({_id: req.params.id}).populate('_user').populate({
                path: 'likes',
                populate: { path: '_user'}
            }).exec(
            (err, idea) => {
                if (err) console.log(err);
                return res.json(idea);
            }
        );
    },

    newIdea: function (req, res) {
        if (!req.session.user || req.session.user.id.length < 1) {
            return res.status(400).json({errors: ["not logged in"]});
        } else {
            User.findById(
                req.session.user.id,
                (err, user) => {
                    if (err) return res.status(400).json(err);
                    Idea.create(
                        {
                            'body': req.body.body,
                            '_user': req.session.user.id
                        },
                        (err, idea) => {
                            if (err) return res.json(err);
                            user.ideas.push(idea._id);
                            user.save();
                            return res.json({ok: true})
                        }
                    );
                }
            )
        };
    },

    like: function (req, res) {
        if (!req.session.user || req.session.user.id.length < 1) {
            return res.status(400).json({errors: ["not logged in"]});
        } else {
            User.findById(
                req.session.user.id,
                (err, user) => {
                    if (err) return res.json(err);
                    Idea.findById(
                        req.params.id,
                        (err, idea) => {
                            let like = Like.create(
                                {
                                    _user: user._id,
                                    _idea: idea._id
                                },
                                (err, thisLike) => {
                                    console.log('like created, not yet saved');
                                    if (err) return res.json(err);
                                    user.likes.push(thisLike._id);
                                    user.save(
                                        (err) => {
                                            if (err) {
                                                return res.json(err);
                                            } else {
                                                idea.likes.push(thisLike._id);
                                                idea.save(
                                                    (err) => {
                                                        if (err) {
                                                            console.dir(err);
                                                        } else {
                                                            res.json({ok:true});
                                                        }
                                                    }
                                                )
                                            }
                                        }
                                    );
                                }
                            );
                        }
                    )


                }
            )
        }
    }
}
//    }
// }

// function reqSignedIn(req, res, next) {
//     if (req.session.user) {
//         next(req, res, );
//     } else {
//         res.redirect('/')
//     }
// }