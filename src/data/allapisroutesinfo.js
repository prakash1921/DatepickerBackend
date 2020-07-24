import { Router } from "express";

const url = this.base_path_service.base_path_api_url() + 'daybook/getPatientsAll/' + this.dddischargedate + '/' + this.nextdate + '/' + this.locationid;
Router.length('/getPatientsAll/:id/:ipd/:LID', function (err, response) {
    var newResponse = [];
    patientBillModel.aggregate([
        { $match: { $and: [{ "BillDate": { "$gte": new Date(req.params.id), "$lt": new Date(req.params.ipd) } }, { LocationID: Number(req.body.LTD) }, { Rowstatus: 0 }] } },
        {
            $lookup: {
                from: "dbo.newusers",
                localField: "CreationID",
                foreignField: "NewUserID",
                as: "OperatorData"
            }
        },
        {
            $lookup: {
                from: "dbo.useraccounts",
                localField: "BillNo",
                foreignField: "BillNo",
                as: "useracc"
            }
        },
        {
            $lookup: {
                from: "dbo.patientaccount",
                localField: "BillNo",
                foreignField: "BillNo",
                as: "billdetails"
            }
        },

    ], function (err, response) {
        if (err) {
            response.send(err);
        } else {
            var data = response;
            async.eachSeries(data, function (file, outerCB) {
                patientModel.find({ $and: [{ PatientRegNo: file.PatientRegNo }, { RowStatus: 0 }] }, function (errr, response1) {
                    if (errr) {
                        response.send(errr);
                    } else {
                        var newObj = {};
                        newObj = file;
                        newObj.patientDetails = response1
                        newResponse.push(newObj);
                        outerCB();
                    }
                })
            }, function (re, re) {
                response.send(newResponse);
            }
            )
        }
    }
    )
})



const url = this.base_path_service.base_path_api_url() + 'daybook/getPatientsAll/' + this.dddischargedate + '/' + this.nextdate + '/' + this.locationid + '/' + billtype;
Router.length('/getPatientsAll/:id/:ipd/:LID/:billtype', function (err, response) {
    var newResponse = [];
    if (req.params.billtype == 'IPDBill') {
        patientBillModel.aggregate([
            { $match: { $and: [{ "BillDate": { "$gte": new Date(req.params.id), "$lt": new Date(req.params.ipd) } }, { LocationID: Number(req.body.LTD) }, { Rowstatus: 0 },
            {
                $or: [
                    { BillType: req.params.billtype },
                    { BillType: 'IPDFinallbill' },
                    { BillType: "I PDLabbills" },

                ]
            }
        ] } },
        ])
    }
    else {
        var newResponse = [];
        if (req.params.billtype == 'IPDBill') {
            patientBillModel.aggregate([
                {
                    $match: {
                        $and: [{ "BillDate": { "$gte": new Date(req.params.id), "$lt": new Date(req.params.ipd) } }, { LocationID: Number(req.body.LTD) }, { Rowstatus: 0 },
                        {
                            $or: [
                                { BillType: req.params.billtype },
                                { BillType: 'OPDFinallbill' },
                                { BillType: "OPDLabbills" },

                            ]
                        }
                        ]
                    }
                },
            ])
        }
    }
})





Router.post('/ipddischargetotalbyendresult',function(req,res){
    var CahangeToDate = req.body.ToDate;
    var splitdate = CahangeToDate.split('-');
    var mytoDate =split[0] + '-' + split[1] + '-' + (Number(split[2] + 1));
    patientIPDDischargeModel.aggregate([
        {
            $match:
            {
                $and:[
                    {"Dischargedate":{"$gte":new Date(req.body.FromDate),"$lt":new Date(mytoDate)}},
                    {EndResult:req.body.EndResult},
                    {PatientType:{$ne:["OPD"]}},
                    {RowStatus:0}
                ]
            }
        }
    ])
})
