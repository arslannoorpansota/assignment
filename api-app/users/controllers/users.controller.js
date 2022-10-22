const UserModel = require('../models/users.model');
exports.insert = (req, res) => {
    result = UserModel.findByEmail(req.body.email).then((result) => {
        if (result && result.length > 0) {
            res.status(201).send({ error: "User Already Exists" });
        }
        else {
            UserModel.createUser(req.body)
                .then((result) => {
                    res.status(201).send({ id: result.id });
                });
        }
    })
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 100000;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send({ error: "user not found" });
            }
        });
};
