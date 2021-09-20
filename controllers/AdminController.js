const express = require('express');
const router = express.Router();
var _ = require("underscore");
const bcrypt = require('bcrypt');
let Manager = require('../models/manager')
let Hotel = require('../models/hotel')
let User = require('../models/user')
let Activity = require('../models/activities')
let FeedBack = require('../models/feedback')
let Refund = require('../models/refund')
let Payment = require('../models/payment')
const saltRounds = 10;
module.exports = function () {

    //Dulanji
    router.post('/add_manager', function (req, res) {
        let ManagerData = new Manager(req.body);
        Manager.find(function (err, data) {
            if (!err) {
                var filtered = _.where(data, { LoginID: req.body.LoginID });
                var TotalNumberOfUser = Object.keys(filtered).length;

                if (TotalNumberOfUser > 0) {
                    var data = {
                        Status: "Fail",
                        Message: "LoginID Already Exists In The Database"
                    }
                    res.status(200).send(data);
                } else {
                    bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
                        ManagerData.Password = hash
                        ManagerData.save()
                            .then(Manager => {
                                var data = {
                                    Status: "Sucess",
                                    Message: "Manager Created Sucessfully"
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

    //Dulanji

    router.put('/update_hotel', function (req, res) {
        try {
            Hotel.updateOne({ _id: req.body.id }, { Hotel_Name: req.body.Hotel_Name, Hotel_Address: req.body.Hotel_Address, Website: req.body.Website, NO_Rooms: req.body.NO_Rooms, Price_Max: req.body.Price_Max, Price_Min: req.body.Price_Min }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "Hotel Data Updated"
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

    //dulanji

    router.get('/get_hotelData', function (req, res) {

        Hotel.find(function (err, dataX) {
            if (!err) {
                var data = {
                    Status: "Sucess",
                    Message: "Hotel Data Retrived",
                    data: dataX
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



    //Dulanji
    router.post('/removeUser', function (req, res) {
        console.log(req.body, "here")
        try {
            User.findByIdAndRemove({ _id: req.body.id }, function (err, todo) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Deleted"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            });

        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }

    })


    //Dulanji

    router.delete('/RemoveMangaer', function (req, res) {
        try {
            Manager.findByIdAndRemove({ _id: req.body.id }, function (err, todo) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "Manager Deleted"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            });

        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }

    })

    //Pawani
    router.post('/add_activity', function (req, res) {
        let ac = new Activity(req.body);
        ac.img="http://ses.ssd6.org/files/2017/12/activities.jpg"
        ac.save()
            .then(Activity => {
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

    //Pawani
    router.post('/getActivityByID', function (req, res) {
        console.log(req.body)
        Activity.find(function (err, dataX) {

            if (!err) {
                var filtered = _.where(dataX, { ActivityName: req.body.id });
                console.log("HU", filtered)
                var data = {
                    Status: "Sucess",
                    Message: "Retrived All Room Data",
                    data: filtered
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
    router.post('/RemoveActivity', function (req, res) {
        console.log(req.body, "here")
        try {
            Activity.findByIdAndRemove({ _id: req.body.id }, function (err, todo) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Deleted"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            });

        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }

    })
    //pawani
    router.get('/getAllFeedBack', function (req, res) {

        FeedBack.find(function (err, dataX) {

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
    //Imalshi
    router.get('/GetallRefund', function (req, res) {

        Refund.find(function (err, dataX) {

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

    //Dulanji
    router.get('/ViewAllPayments', function (req, res) {

        Payment.find(function (err, dataX) {

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








    return router;
}