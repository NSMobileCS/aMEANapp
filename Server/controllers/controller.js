const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const Bid = mongoose.model('Bid');
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

    getUser: function (req, res) {
        if (req.session.user && req.session.user.name && req.session.id ) {
            return res.json(req.session.user);
        } else {
            return res.status(400).json({errors: ["not logged in"]});
        }
    },

    listProducts: function (req, res) {
        Product.find({}).populate('bids').exec(
            (err, prods) => {
                if (err) {
                    return res.json(err);
                } else {
                    return res.json(prods);
                }
            }
        )
    },

    setProducts: function (req, res) {
        Product.remove(
            {},
            (err) => console.dir(err)
        );
        for (let idx=0; idx < 3; idx++) {
            Product.create({name: `Product ${idx}`})
        }
        return res.json({ok:true});
    },

    getProdBids: function (req, res) {
        Product.findById(req.params.id).populate(
            {
                path: 'bids',
                populate: [
                    { path: '_user' },
                    { path: 'value' }
                ]
            }
        ).exec(
            (err, prod) => {
                if (err) console.log(err);
                return res.json(prod);
            }
        );
    },


    postBid: function (req, res) {
        if (!req.session.user || req.session.user.id.length < 1) {
            return res.status(400).json({errors: ["not logged in"]});
        } else {
            User.findById(
                req.session.user.id,
                (err, user) => {
                    if (err) return res.json(err);
                    Product.findById(
                        req.params.id,
                        (err, prod) => {
                            Bid.create(
                                {
                                    _user: user._id,
                                    _product: prod._id,
                                    value: Number(req.body.value)
                                },
                                (err, thisBid) => {
                                    if (err) console.log(err);
                                    prod.bids.push(thisBid._id);
                                    prod.save(
                                        (err) => {
                                            if (err) {
                                                console.dir(err);
                                            } else {
                                                res.json({ok:true});
                                            }
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            )
        }
    }
}