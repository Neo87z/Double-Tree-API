const express = require('express');
const router = express.Router();
var _ = require("underscore");
const bcrypt = require('bcrypt');
let User = require('../models/user')
let Activity = require('../models/activities')
let FeedBack = require('../models/feedback')
let Refund = require('../models/refund')
let Payment = require('../models/payment')
const saltRounds = 10;
module.exports = function () {


    //Pawani
    router.post('/add_user', function (req, res) {
        let UserData = new User(req.body);
        User.find(function (err, data) {
            if (!err) {
                var filtered = _.where(data, { Email: req.body.Email });
                var TotalNumberOfUser = Object.keys(filtered).length;

                if (TotalNumberOfUser > 0) {
                    var data = {
                        Status: "Email",
                        Message: "Email Already Exists In The Database"
                    }
                    res.status(200).send(data);
                } else {
                    bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
                        UserData.Password = hash
                        UserData.save()
                            .then(User => {
                                var data = {
                                    Status: "Sucess",
                                    Message: "User Created Sucessfully"
                                }
                                res.status(201).send(data);
                            }).catch(err => {
                                var data = {
                                    Status: "Fail",
                                    Message: "Unexpected Error PLease Contact System Admin"
                                }
                                res.status(200).send(data);
                            });
                    })
                }
            } else {
                var data = {
                    Status: "Faiil",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    //Pawani
    router.post('/login', function (req, res) {
        User.find({ Email: req.body.Email }, function (err, data) {
            if (!err) {
                var filtered = _.where(data, { Email: req.body.Email });
                var TotalNumberOfUser = Object.keys(filtered).length;
                if (TotalNumberOfUser == 0) {
                    var data = {
                        Status: "Fail",
                        Message: "Invalid Email"
                    }
                    res.status(200).send(data);
                } else {
                    hash = filtered[0].Password
                    password = req.body.Password

                    bcrypt.compare(password, hash, function (err, result) {
                        console.log(req.body.Password)

                        if (result == true) {
                            var data = {
                                Status: "Sucess",
                                Message: "Login Sucessfull"
                            }
                            res.status(200).send(data);

                        } else {
                            var data = {
                                Status: "Fail",
                                Message: "Invalid Credentails"
                            }
                            res.status(200).send(data);
                        }
                    });

                }

            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    //Imalshi

    router.post('/get_UserData', function (req, res) {
        console.log(req.body)
        User.find(function (err, data) {
            if (!err) {
                var filtered = _.where(data, { Email: req.body.id });
                var TotalNumberOfUser = Object.keys(filtered).length;
                console.log(filtered)
                if (TotalNumberOfUser == 0) {
                    var data = {
                        Status: "Fail",
                        Message: "Invalid Email"
                    }
                    res.status(200).send(data);
                } else {
                    console.log(filtered)
                    var data = {
                        Status: "Sucess",
                        Message: "user Data Retrived",
                        data: filtered
                    }
                    res.status(200).send(data);
                }
            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    //Imalshi

    router.post('/updateUser', function (req, res) {
        try {
            User.updateOne({ Email: req.body.Email }, { Full_Name: req.body.Full_Name, Age: req.body.Age, Phone: req.body.Phone, Sex: req.body.sex }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Data Updated"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            })
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })


    //Dulanji

    router.get('/get_all_Users', function (req, res) {
        console.log(req.body)
        User.find(function (err, data) {
            if (!err) {



                var data = {
                    Status: "Sucess",
                    Message: "user Data Retrived",
                    data: data
                }
                res.status(200).send(data);

            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })


    //pawani

    router.get('/get_all_actiities', function (req, res) {

        Activity.find(function (err, dataX) {

            if (!err) {
                var data = {
                    Status: "Sucess",
                    Message: "Retrived All Activitues",
                    data: dataX
                }
                res.status(200).send(dataX);
            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    //Pawani


    router.post('/AddFeedBack', function (req, res) {
        let FC = new FeedBack(req.body);
        FC.img="https://cdn.pixabay.com/photo/2020/01/07/05/42/feedback-4746811_960_720.png"
        FC.save()
            .then(FeedBack => {
                var data = {
                    Status: "Sucess",
                    Message: "Activity Created Sucessfully"
                }
                res.status(201).send(data);
            }).catch(err => {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            });

    })

    //Imlashi
    router.post('/AddRefund', function (req, res) {
        let RF = new Refund(req.body);
        RF.img="https://assets.website-files.com/5f50dfefde2d2df9368da112/5f6b1251e944e9c21ed2cdec_The-Digital-Business-Owner%E2%80%99s-Guide-To-Refunds_Mesa-de-trabajo-1.png"
        RF.save()
            .then(Refund => {
                var data = {
                    Status: "Sucess",
                    Message: "Activity Created Sucessfully"
                }
                res.status(201).send(data);
            }).catch(err => {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            });

    })


    //Dulanji
    router.post('/MakePayment', function (req, res) {
        let RF = new Payment(req.body);
        RF.img="https://nmgprod.s3.amazonaws.com/media/files/a9/cf/a9cfd21d1973a93b6b366afa65efad9f/cover_image.jpg.760x400_q85_crop_upscale.jpg"
        RF.save()
            .then(Payment => {
                var data = {
                    Status: "Sucess",
                    Message: "Activity Created Sucessfully"
                }
                res.status(201).send(data);
            }).catch(err => {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            });

    })

    return router;
}