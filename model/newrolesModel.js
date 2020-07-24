const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoleSchema = new Schema({
    HospitalID: {
        type: Number
    },
    LocationID: {
        type: Number
    },
    RoleID: {
        type: Number
    },
    RoleName: {
        type: String
    },
    dashBoardRights: [{
        dash: {
            dashboard: {
                type: Boolean
            }
        }
    }],

    hospitalRights: [{
        userRolesRights: {
            hospital: {
                type: Boolean
            },
            userRights: {
                userAdd: {
                    type: Boolean
                },
                userEdit: {
                    type: Boolean
                },
                userDelete: {
                    type: Boolean
                },
            },
            roleRights: {
                roleAdd: {
                    type: Boolean
                },
                roleEdit: {
                    type: Boolean
                },
                roleDelete: {
                    type: Boolean
                },
            },
            hospitals: {
                hospitalAdd: {
                    type: Boolean
                },
                hospitalEdit: {
                    type: Boolean
                },
                hospitalDelete: {
                    type: Boolean
                },
            },
            hospitalLocation: {
                hospitalLocationAdd: {
                    type: Boolean
                },
                hospitalLocationEdit: {
                    type: Boolean
                },
                hospitalLocationDelete: {
                    type: Boolean
                },
            },

        }
    }],
    masterRights: [{
        mastersRolesRights: {
            masters: {
                type: Boolean
            },
            Department:{
                departAdd:{
                    type:Boolean
                },
                departEdit:{
                    type:Boolean
                },
                departDelete:{
                    type:Boolean
                },
            },
            Qualification:{
                qualificationAdd:{
                    type:Boolean
                },
                qualificationEdit:{
                    type:Boolean
                },
                qualificationDelete:{
                    type:Boolean
                },
            },
            Specialization:{
                specializationAdd:{
                    type:Boolean
                },
                specializationEdit:{
                    type:Boolean
                },
                specializationDelete:{
                    type:Boolean
                },
            },
            Doctors:{
                doctorAdd:{
                    type:Boolean
                },
                doctorEdit:{
                    type:Boolean
                },
                doctorDelete:{
                    type:Boolean
                },
            },
            Headres:{
                headerAdd:{
                    type:Boolean
                },
                headerEdit:{
                    type:Boolean
                },
                headerDelete:{
                    type:Boolean
                },
            },
            Parameter:{
                parameterAdd:{
                    type:Boolean
                },
                parameterEdit:{
                    type:Boolean
                },
                parameterDelete:{
                    type:Boolean
                },
            },
            SampleType:{
                sampleTypeAdd:{
                    type:Boolean
                },
                sampleTypeEdit:{
                    type:Boolean
                },
                sampleTypeDelete:{
                    type:Boolean
                },
            },
            TestMaster:{
                testMasterAdd:{
                    type:Boolean
                },
                testMasterEdit:{
                    type:Boolean
                },
                testMasterDelete:{
                    type:Boolean
                },
            },
        }
    }],
patientRights:[{
    PatientRolesRights:{
        patient:{
            type:Boolean
        },
        patientRegistration:{
            patientAdd:{
                type:Boolean
            },
            patientEdit:{
                type:Boolean
            },
        },
        patientPaymentDeposit:{
            patientPaymentDepositAdd:{
                type:Boolean
            },
            patientPaymentDepositDetailsAdd:{
                type:Boolean
            },
        },
        OPDBills:{
            opdAdd:{
                type:Boolean
            },
            opdEdit:{
                type:Boolean
            },
            opdDelete:{
                type:Boolean
            },
        },
        IPDBills:{
            ipdAdd:{
                type:Boolean
            },
            ipdEdit:{
                type:Boolean
            },
            ipdDelete:{
                type:Boolean
            },
        },
    }
}],
reportRights:[{
    ReportRolesRights:{
        report:{
            type:Boolean
        },
        HospitalDayBook:{
            hospitalDayBookView:{
                type:Boolean
            },
            hospitalDayBookOPDView:{
                type:Boolean
            },
            hospitalDayBookIPDView:{
                type:Boolean
            },
        },
    }
}],
    CreationID: {
        type: Number,
        default: 1
    },
    CreationDate: {
        type: Date,
        default: Date.now,
    },
    ModificationID: {
        type: Number,
        default: 1
    },
    ModificationDate: {
        type: Date,
        default: Date.now,
    },
    Rowstatus: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
module.exports = mongoose.model('dbo.newroles', RoleSchema)