var express = require("express");
var router = express.Router();
const path = require('path');
const fs = require('fs');
var async = require("async");
const electionModel = require('../model/electionModel');
const newStateModel = require('../model/newStateMode');
const newCityModel = require('../model/newCityMode');




function incrementIDForElection(cb) {
    electionModel.find(function (err, response) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, response)
        }
    }).sort({ ID: -1 }).limit(1);
}

function incrementIDForState(cb) {
    newStateModel.find(function (err, response) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, response)
        }
    }).sort({ ID: -1 }).limit(1);
}
function incrementIDForCity(cb) {
    newCityModel.find(function (err, response) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, response)
        }
    }).sort({ ID: -1 }).limit(1);
}

function getfiledetailsandsave() {

    const directoryPath = path.join('', 'public/Excel');
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } else {
            console.log('filesss', files)

            async.eachSeries(files, function (file, outercb) {
                if (file) {
                    console.log("file in async ", file)
                    var splitResponse = file.split('_')
                    var splitElectionNo = splitResponse[1].split(' ');
                    console.log("spli value", splitElectionNo[0])
                    var electionObj = {};
                    incrementIDForElection(function (err, electionResponse) {
                        if (err) {
                            console.log("err", err);
                        } else {
                            if (electionResponse.length != 0) {
                                electionObj.ID = electionResponse[0].ID + 1;
                            } else {
                                electionObj.ID = 0;
                            }
                            var elctionName=file.split(' ');
                            electionObj.ElectionID = splitElectionNo[0]
                            electionObj.ElectionResult = elctionName[0];
                            var saveElection = new electionModel(electionObj);
                            saveElection.save((e, electionres) => {
                                if (e) {
                                    console.log("fffff", e);
                                } else {
                                    console.log('saved electionres', electionres)
                                    const statedirectoryPath = path.join('', 'public/Excel' + '/' + file);
                                    fs.readdir(statedirectoryPath, function (innererr, innerfiles) {
                                        if (innererr) {
                                            console.log("innererr", innererr)
                                        } else {
                                            var count = 0;

                                            async.eachSeries(innerfiles, function (innerfile, innercb) {
                                                if (innerfile) {
                                                    // console.log("inner files enters",innerfile)
                                                    if (innerfile == "Districts and number" + ' ' + splitElectionNo[0] + '.json') {
                                                        var stateJsonData = require("../public/Excel" + "/" + file+"/"+innerfile);
                                                        // console.log("count value",count) 
                                                        // count++;
                                                        console.log("state value")
                                                        var newStateID = 0;
                                                        incrementIDForState(function (err, stateResponse) {
                                                            if (err) {
                                                                console.log("err", err);
                                                            } else {
                                                                var stateObj = {};
                                                                if (stateResponse.length != 0) {
                                                                    stateObj.ID = stateResponse[0].ID + 1;
                                                                } else {
                                                                    stateObj.ID = 0;
                                                                }
                                                                newStateID = stateObj.ID
                                                                stateObj.ElectionID = splitElectionNo[0];
                                                                console.log("State Id", stateObj.ID);
                                                                var splitState=innerfile.split(' ');
                                                                console.log("splitStatesplitState",splitState)
                                                                var splitStateno=splitState[3].split('.');
                                                                stateObj.stateID=splitStateno[0]
                                                                stateObj.stateData = stateJsonData;
                                                                var saveState = new newStateModel(stateObj);
                                                                saveState.save((stateerr, stateres) => {
                                                                    if (stateerr) {
                                                                        console.log("fffff", stateerr);
                                                                    } else {
                                                                        // innercb();
                                                                        var count = 0;
                                                                        async.eachSeries(innerfiles, function (nestedfile, nestedinnercb) {
                                                                            if (nestedfile) {
                                                                                var cityJsonData = require("../public/Excel" + "/" + file+"/"+nestedfile);
                                                                                if (nestedfile != "Districts and number" + ' ' + splitElectionNo[0] + '.json') {
                                                                                    console.log('newS', newStateID);
                                                                                    console.log("count", count++);
                                                                                    incrementIDForCity(function (err, cityResponse) {
                                                                                        if (err) {
                                                                                            console.log("err", err);
                                                                                        } else {
                                                                                            var cityObj={}
                                                                                            if (cityResponse.length != 0) {
                                                                                                cityObj.ID = cityResponse[0].ID + 1;
                                                                                            } else {
                                                                                                cityObj.ID = 0;
                                                                                            }
                                                                                            var splitCity=nestedfile.split('.');
                                                                                            cityObj.cityID=splitCity[0];
                                                                                            cityObj.cityData=cityJsonData;
                                                                                            cityObj.stateID=splitStateno[0];
                                                                                            var saveCity = new newCityModel(cityObj);
                                                                                            saveCity.save((cityeerr, cityres) => {
                                                                                                if (cityeerr) {
                                                                                                    console.log("fffff", cityeerr);
                                                                                                } else {
                                                                                                    nestedinnercb();
                                                                                                }
                                                                                            })

                                                                                        }
                                                                                    })


                                                                                } else {
                                                                                    nestedinnercb();
                                                                                }
                                                                            } else {
                                                                                nestedinnercb();
                                                                            }
                                                                        }, function (nesteder, nestedre) {
                                                                            innercb();
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })

                                                    } else {
                                                        innercb();
                                                    }
                                                } else {
                                                    innercb();
                                                }
                                            }, function (innerer, innerre) {

                                                outercb();
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    outercb();
                }

            }, function (err, res) {
                console.log("async resss", res)
            })



        }

    });
}

function removeIDForElection() {
    electionModel.remove(function (err, response) {
        if (err) {
            // cb(err, null)
            console.log("removed election data", err)
        } else {
            console.log("removed election data", response)
        }
    })
}
function removeIDForState() {
    newStateModel.remove(function (err, response) {
        if (err) {
            // cb(err, null)
            console.log("removed state data", err)
        } else {
            console.log("removed state data", response)
        }
    })
}
function removeIDForCity() {
    newCityModel.remove(function (err, response) {
        if (err) {
            // cb(err, null)
            console.log("removed City data", err)
        } else {
            console.log("removed City data", response)
        }
    })
}


// getfiledetailsandsave();


// removeIDForElection();
// removeIDForState();
// removeIDForCity();

// function getvalueForCity() {
//     newCityModel.find(function (err, response) {
//         if (err) {
//           console.log("errr")
//         } else {
//             console.log("response", response)
//         }
//     }).sort({ ID: -1 }).limit(8);
// }
// getvalueForCity()














function getstatenewcollection() {

    const directoryPath = path.join('', 'public/Excel');
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } else {
            console.log('filesss', files)

            async.eachSeries(files, function (file, outercb) {
                if (file) {
                    if(file=='Results_43 Json'){
                    console.log("file in async ", file)
                    var splitResponse = file.split('_')
                    var splitElectionNo = splitResponse[1].split(' ');
                    console.log("spli value", splitElectionNo[0])
                    var electionObj = {};
                    incrementIDForElection(function (err, electionResponse) {
                        if (err) {
                            console.log("err", err);
                        } else {
                            if (electionResponse.length != 0) {
                                electionObj.ID = electionResponse[0].ID + 1;
                            } else {
                                electionObj.ID = 0;
                            }
                            var elctionName=file.split(' ');
                            electionObj.ElectionID = splitElectionNo[0]
                            electionObj.ElectionResult = elctionName[0];
                            var saveElection = new electionModel(electionObj);
                            saveElection.save((e, electionres) => {
                                if (e) {
                                    console.log("fffff", e);
                                } else {
                                    console.log('saved electionres', electionres)
                                    const statedirectoryPath = path.join('', 'public/Excel' + '/' + file);
                                    fs.readdir(statedirectoryPath, function (innererr, innerfiles) {
                                        if (innererr) {
                                            console.log("innererr", innererr)
                                        } else {
                                            var count = 0;

                                            async.eachSeries(innerfiles, function (innerfile, innercb) {
                                                if (innerfile) {
                                                    // console.log("inner files enters",innerfile)
                                                    if (innerfile == "Districts and number" + ' ' + splitElectionNo[0] + '.json') {
                                                        var stateJsonData = require("../public/Excel" + "/" + file+"/"+innerfile);
                                                        // console.log("count value",count) 
                                                        // count++;
                                                        console.log("state value")
                                                        var newStateID = 0;
                                                        incrementIDForState(function (err, stateResponse) {
                                                            if (err) {
                                                                console.log("err", err);
                                                            } else {
                                                                var stateObj = {};
                                                                if (stateResponse.length != 0) {
                                                                    stateObj.ID = stateResponse[0].ID + 1;
                                                                } else {
                                                                    stateObj.ID = 0;
                                                                }
                                                                newStateID = stateObj.ID
                                                                stateObj.ElectionID = splitElectionNo[0];
                                                                console.log("State Id", stateObj.ID);
                                                                var splitState=innerfile.split(' ');
                                                                console.log("splitStatesplitState",splitState)
                                                                var splitStateno=splitState[3].split('.');
                                                                stateObj.stateID=splitStateno[0]
                                                                stateObj.stateData = stateJsonData;
                                                                var saveState = new newStateModel(stateObj);
                                                                saveState.save((stateerr, stateres) => {
                                                                    if (stateerr) {
                                                                        console.log("fffff", stateerr);
                                                                    } else {
                                                                        console.log('created state collection')
                                                                        // innercb();
                                                                        // var count = 0;
                                                                        // async.eachSeries(innerfiles, function (nestedfile, nestedinnercb) {
                                                                        //     if (nestedfile) {
                                                                        //         var cityJsonData = require("../public/Excel" + "/" + file+"/"+nestedfile);
                                                                        //         if (nestedfile != "Districts and number" + ' ' + splitElectionNo[0] + '.json') {
                                                                        //             console.log('newS', newStateID);
                                                                        //             console.log("count", count++);
                                                                        //             incrementIDForCity(function (err, cityResponse) {
                                                                        //                 if (err) {
                                                                        //                     console.log("err", err);
                                                                        //                 } else {
                                                                        //                     var cityObj={}
                                                                        //                     if (cityResponse.length != 0) {
                                                                        //                         cityObj.ID = cityResponse[0].ID + 1;
                                                                        //                     } else {
                                                                        //                         cityObj.ID = 0;
                                                                        //                     }
                                                                        //                     var splitCity=nestedfile.split('.');
                                                                        //                     cityObj.cityID=splitCity[0];
                                                                        //                     cityObj.cityData=cityJsonData;
                                                                        //                     cityObj.stateID=splitStateno[0];
                                                                        //                     var saveCity = new newCityModel(cityObj);
                                                                        //                     saveCity.save((cityeerr, cityres) => {
                                                                        //                         if (cityeerr) {
                                                                        //                             console.log("fffff", cityeerr);
                                                                        //                         } else {
                                                                        //                             nestedinnercb();
                                                                        //                         }
                                                                        //                     })

                                                                        //                 }
                                                                        //             })


                                                                        //         } else {
                                                                        //             nestedinnercb();
                                                                        //         }
                                                                        //     } else {
                                                                        //         nestedinnercb();
                                                                        //     }
                                                                        // }, function (nesteder, nestedre) {
                                                                        //     innercb();
                                                                        // })
                                                                    }
                                                                })
                                                            }
                                                        })

                                                    } else {
                                                        innercb();
                                                    }
                                                } else {
                                                    innercb();
                                                }
                                            }, function (innerer, innerre) {

                                                outercb();
                                            })
                                       
                                        }
                                    })
                                }
                            })
                        }
                    })
                }else{
                    outercb();
                } 
                } else {
                    outercb();
                }

            }, function (err, res) {
                console.log("async resss", res)
            })



        }

    });
}
// getstatenewcollection();
module.exports = router;