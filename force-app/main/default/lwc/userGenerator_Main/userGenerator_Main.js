import { LightningElement, track } from 'lwc';

import getRecords from '@salesforce/apex/ApexDataInterface.getRecords';
import getRecordsWhere from '@salesforce/apex/ApexDataInterface.getRecordsWhere';
import insertRecord from '@salesforce/apex/ApexDataInterface.insertRecord';


export default class UserGenerator_Main extends LightningElement {
    @track fieldElements;

    // The options that Profile displays depends on which user license you chose, so we need to modify them accordingly
    allProfileOptions;
    dropDownsAreInitialized;

    userRoleId;


    connectedCallback() {
        if(!this.fieldElements) {
            this.fieldElements = {};

            this.fieldElements['FirstName'] = {
                objectName: 'User',
                fieldNames: [
                    'FirstName'
                ]
            };

            this.fieldElements['LastName'] = {
                objectName: 'User',
                fieldNames: [
                    'LastName'
                ]
            };

            this.fieldElements['Email'] = {
                objectName: 'User',
                fieldNames: [
                    'Email'
                ]
            };

            this.fieldElements['Username'] = {
                objectName: 'User',
                fieldNames: [
                    'Username'
                ]
            };

            this.fieldElements['Nickname'] = {
                objectName: 'User',
                fieldNames: [
                    'CommunityNickname'
                ]
            };

            this.fieldElements['Alias'] = {
                objectName: 'User',
                fieldNames: [
                    'Alias'
                ]
            };

            this.fieldElements['Profile'] = {
                objectName: 'Profile',
                fieldNames: [
                    'Id',
                    'Name'
                ]
            };


            this.fieldElements['UserLookup'] = {
                objectName: 'rstk__syusr__c',
                fieldNames: [
                    'rstk__syusr_employee__c'
                ]
            };

            this.fieldElements['ClockNumber'] = {
                objectName: 'rstk__syusr__c',
                fieldNames: [
                    'rstk__syusr_clockno__c'
                ]
            };

            this.fieldElements['DefaultCompany'] = {
                objectName: 'rstk__sycmp__c',
                fieldNames: [
                    'Id',
                    'Name'
                ]
            };

            this.fieldElements['DefaultDivision'] = {
                objectName: 'rstk__sydiv__c',
                fieldNames: [
                    'Id',
                    'Name'
                ]
            };


            this.fieldElements['LaborOhd'] = {
                objectName: 'rstk__syusr__c',
                fieldNames: [
                    'rstk__syusr_ohdlabind__c'
                ],

                defaultOption: true
            };

            this.fieldElements['LaborChargingUser'] = {
                objectName: 'rstk__syusr__c',
                fieldNames: [
                    'rstk__syusr_laboronly__c'
                ]
            };

            this.fieldElements['LaborGrade'] = {
                objectName: 'rstk__rtlabgrd__c',
                fieldNames: [
                    'Id',
                    'Name'
                ]
            };

            this.fieldElements['HourlyRate'] = {
                objectName: 'rstk__syusr__c',
                fieldNames: [
                    'rstk__syusr_hrrate__c'
                ]
            };
        }

        
        if(!this.dropDownsAreInitialized) {
            this.initializeDropdownOptions();

            // Get Role
            getRecords({ objectName: 'UserRole', fields: ['Id', 'Name'], maxSize: 100 }).then(records => {
                if(records) {
                    if(records.length > 0) {
                        records.forEach(record => {
                            if(record.Name === 'User') {
                                this.userRoleId = record.Id;
                            }
                        });
                    }else {
                        alert('No records found for Role');
                        console.log('No records found for Role');
                    }
                }
            }).catch(err => {
                alert('Unable to get records for Role');
                console.log(err);
            });
        }
    }


    initializeDropdownOptions() {
        // Profile
        getRecords({ objectName: this.fieldElements['Profile'].objectName, fields: this.fieldElements['Profile'].fieldNames, maxSize: 100 }).then(records => {
            if(records) {
                if(records.length > 0) {
                    this.fieldElements['Profile'].options = [];

                    records.forEach(record => {
                        this.fieldElements['Profile'].options.push({
                            value: record.Id,
                            label: record.Name
                        });
                    });

                    this.fieldElements['Profile'].defaultOption = this.fieldElements['Profile'].options[42].value;
                }else {
                    alert('No records found for Profile');
                    console.log('No records found for Profile');
                }
            }
        }).catch(err => {
            alert('Unable to get records for Profile');
            console.log(err);
        });


        // DefaultCompany
        getRecords({ objectName: this.fieldElements['DefaultCompany'].objectName, fields: this.fieldElements['DefaultCompany'].fieldNames, maxSize: 100 }).then(records => {
            if(records) {
                if(records.length > 0) {
                    this.fieldElements['DefaultCompany'].options = [];

                    records.forEach(record => {
                        this.fieldElements['DefaultCompany'].options.push({
                            value: record.Id,
                            label: record.Name
                        });
                    });

                    this.fieldElements['DefaultCompany'].defaultOption = this.fieldElements['DefaultCompany'].options[0].value;
                }else {
                    alert('No records found for DefaultCompany');
                    console.log('No records found for DefaultCompany');
                }
            }
        }).catch(err => {
            alert('Unable to get records for DefaultCompany');
            console.log(err);
        });

        // DefaultDivision
        getRecords({ objectName: this.fieldElements['DefaultDivision'].objectName, fields: this.fieldElements['DefaultDivision'].fieldNames, maxSize: 100 }).then(records => {
            if(records) {
                if(records.length > 0) {
                    this.fieldElements['DefaultDivision'].options = [];

                    records.forEach(record => {
                        this.fieldElements['DefaultDivision'].options.push({
                            value: record.Id,
                            label: record.Name
                        });
                    });

                    this.fieldElements['DefaultDivision'].defaultOption = this.fieldElements['DefaultDivision'].options[0].value;
                }else {
                    alert('No records found for DefaultDivision');
                    console.log('No records found for DefaultDivision');
                }
            }
        }).catch(err => {
            alert('Unable to get records for DefaultDivision');
            console.log(err);
        });


        // LaborGrade
        getRecords({ objectName: this.fieldElements['LaborGrade'].objectName, fields: this.fieldElements['LaborGrade'].fieldNames, maxSize: 100 }).then(records => {
            if(records) {
                if(records.length > 0) {
                    this.fieldElements['LaborGrade'].options = [];

                    records.forEach(record => {
                        this.fieldElements['LaborGrade'].options.push({
                            value: record.Id,
                            label: record.Name
                        });
                    });

                    this.fieldElements['LaborGrade'].defaultOption = this.fieldElements['LaborGrade'].options[2].value;
                }else {
                    alert('No records found for LaborGrade');
                    console.log('No records found for LaborGrade');
                }
            }
        }).catch(err => {
            alert('Unable to get records for LaborGrade');
            console.log(err);
        });


        this.dropdownOptionsAreInitialized = true;
    }


    renderedCallback() {
        if(!this.fieldElements['FirstName'].domElement) {
            this.fieldElements['FirstName'].domElement = this.template.querySelector("[data-id='FirstName']");
            this.fieldElements['FirstName'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['LastName'].domElement = this.template.querySelector("[data-id='LastName']");
            this.fieldElements['LastName'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['Email'].domElement = this.template.querySelector("[data-id='Email']");
            this.fieldElements['Email'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['Username'].domElement = this.template.querySelector("[data-id='Username']");
            this.fieldElements['Username'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['Nickname'].domElement = this.template.querySelector("[data-id='Nickname']");
            this.fieldElements['Nickname'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['Alias'].domElement = this.template.querySelector("[data-id='Alias']");
            this.fieldElements['Alias'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['Profile'].domElement = this.template.querySelector("[data-id='Profile']");
            this.fieldElements['Profile'].domElement.addEventListener("change", this.handleInput.bind(this));


            this.fieldElements['UserLookup'].domElement = this.template.querySelector("[data-id='UserLookup']");
            this.fieldElements['UserLookup'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['ClockNumber'].domElement = this.template.querySelector("[data-id='ClockNumber']");
            this.fieldElements['ClockNumber'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['DefaultCompany'].domElement = this.template.querySelector("[data-id='DefaultCompany']");
            this.fieldElements['DefaultCompany'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['DefaultDivision'].domElement = this.template.querySelector("[data-id='DefaultDivision']");
            this.fieldElements['DefaultDivision'].domElement.addEventListener("change", this.handleInput.bind(this));


            this.fieldElements['LaborOhd'].domElement = this.template.querySelector("[data-id='LaborOhd']");
            this.fieldElements['LaborOhd'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['LaborChargingUser'].domElement = this.template.querySelector("[data-id='LaborChargingUser']");
            this.fieldElements['LaborChargingUser'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['LaborGrade'].domElement = this.template.querySelector("[data-id='LaborGrade']");
            this.fieldElements['LaborGrade'].domElement.addEventListener("change", this.handleInput.bind(this));

            this.fieldElements['HourlyRate'].domElement = this.template.querySelector("[data-id='HourlyRate']");
            this.fieldElements['HourlyRate'].domElement.addEventListener("change", this.handleInput.bind(this));
        }

    }


    generateValuesFromName() {
        let firstNameLower = this.fieldElements['FirstName'].domElement.value.toLowerCase();
        let lastNameLower = this.fieldElements['LastName'].domElement.value.toLowerCase();

        this.fieldElements['Email'].domElement.value = firstNameLower + '.' + lastNameLower + '@summitbodies.com';

        this.fieldElements['Username'].domElement.value = this.fieldElements['Email'].domElement.value;

        this.fieldElements['Nickname'].domElement.value = firstNameLower + '.' + lastNameLower;

        this.fieldElements['Alias'].domElement.value = firstNameLower[0] + lastNameLower.substring(0, 4);
    }

    generateValuesFromEmail() {
        let beforeAt = this.fieldElements['Email'].domElement.value.split("@")[0];

        this.fieldElements['Username'].domElement.value = this.fieldElements['Email'].domElement.value;

        this.fieldElements['Nickname'].domElement.value = beforeAt;
    }


    handleInput(event) {
        switch(event.target.getAttribute("data-id")) {
            case 'FirstName':
//console.log(this.fieldElements['FirstName'].domElement.value);
                this.fieldElements['FirstName'].domElement.value = this.fieldElements['FirstName'].domElement.value.trim();
                this.generateValuesFromName();
                break;

            case 'LastName':
//console.log(this.fieldElements['LastName'].domElement.value);
                this.fieldElements['LastName'].domElement.value = this.fieldElements['LastName'].domElement.value.trim();
                this.generateValuesFromName();
                break;

            case 'Email':
//console.log(this.fieldElements['Email'].domElement.value);
                this.fieldElements['Email'].domElement.value = this.fieldElements['Email'].domElement.value.trim();
                this.generateValuesFromEmail();
                break;

            case 'Username':
//console.log(this.fieldElements['Username'].domElement.value);
                this.fieldElements['Username'].domElement.value = this.fieldElements['Username'].domElement.value.trim();
                break;

            case 'Nickname':
//console.log(this.fieldElements['Nickname'].domElement.value);
                this.fieldElements['Nickname'].domElement.value = this.fieldElements['Nickname'].domElement.value.trim();
                break;

            case 'Alias':
//console.log(this.fieldElements['Alias'].domElement.value);
                this.fieldElements['Alias'].domElement.value = this.fieldElements['Alias'].domElement.value.trim();
                break;

            case 'Profile':
//console.log(this.fieldElements['Profile'].domElement.value);
                break;


            case 'UserLookup':
//console.log(this.fieldElements['UserLookup'].domElement.value);
                break;

            case 'ClockNumber':
//console.log(this.fieldElements['ClockNumber'].domElement.value);
                this.fieldElements['ClockNumber'].domElement.value = this.fieldElements['ClockNumber'].domElement.value.trim();
                break;

            case 'DefaultCompany':
//console.log(this.fieldElements['DefaultCompany'].domElement.value);
                break;

            case 'DefaultDivision':
//console.log(this.fieldElements['DefaultDivision'].domElement.value);
                break;

            
            case 'LaborOhd':
//console.log(this.fieldElements['LaborOhd'].domElement.checked);
                break;

            case 'LaborChargingUser':
//console.log(this.fieldElements['LaborChargingUser'].domElement.checked);
                break;

            case 'LaborGrade':
//console.log(this.fieldElements['LaborGrade'].domElement.value);
                break;

            case 'HourlyRate':
//console.log(this.fieldElements['HourlyRate'].domElement.value);
                this.fieldElements['HourlyRate'].domElement.value = this.fieldElements['HourlyRate'].domElement.value.trim();
                break;


            default:
                break;
        }
    }


    submitSalesforce() {
        let fieldsMap = {};
        
        fieldsMap['FirstName'] = this.fieldElements['FirstName'].domElement.value;
        fieldsMap['LastName'] = this.fieldElements['LastName'].domElement.value;
        fieldsMap['Email'] = this.fieldElements['Email'].domElement.value;
        fieldsMap['Username'] = this.fieldElements['Username'].domElement.value;
        fieldsMap['CommunityNickname'] = this.fieldElements['Nickname'].domElement.value;
        fieldsMap['Alias'] = this.fieldElements['Alias'].domElement.value;
        fieldsMap['UserRoleId'] = this.userRoleId;
        fieldsMap['ProfileId'] = this.fieldElements['Profile'].domElement.value;

        fieldsMap['IsActive'] = true;
        fieldsMap['EmailEncodingKey'] = 'ISO-8859-1';
        fieldsMap['LanguageLocaleKey'] = 'en_US';
        fieldsMap['LocaleSidKey'] = 'en_US';
        fieldsMap['TimeZoneSidKey'] = 'America/Chicago';

        insertRecord({ objectName: 'User', fieldValuePairs: fieldsMap }).then(result => {
            if(result) {
                alert("Record Inserted");

            

                getRecordsWhere({
                    objectName: 'User',
        
                    fields: ['Id'],
        
                    whereValuePairs: {
                        'Email': this.fieldElements['Email'].domElement.value
                    },
        
                    maxSize: 1
                }).then(records => {
                    let record = records[0];

                    this.fieldElements['UserLookup'].domElement.value = record.Id;
                }).catch(err => {
                    alert("After Insert, call to getRecordsWhere failed. Something went wrong.");
                    console.log(err);
                });


            }else {
                alert("Unable to Insert Record, Something Went Wrong");
                console.log("Unable to Insert record, something went wrong");
            }
        }).catch(err => {
            alert("Unable to Insert Record, Something Went Wrong");
            console.log(err);
        });
    }

    submitRootstock() {
        let fieldsMap = {};

        fieldsMap['rstk__syusr_employee__c'] = this.fieldElements['UserLookup'].domElement.value;
        fieldsMap['rstk__syusr_clockno__c'] = Number(this.fieldElements['ClockNumber'].domElement.value);
        fieldsMap['rstk__syusr_hrrate__c'] = Number(this.fieldElements['HourlyRate'].domElement.value);
        fieldsMap['rstk__syusr_ohdlabind__c'] = this.fieldElements['LaborOhd'].domElement.checked;
        fieldsMap['rstk__syusr_laboronly__c'] = this.fieldElements['LaborChargingUser'].domElement.checked;
        fieldsMap['rstk__syusr_labgrd__c'] = this.fieldElements['LaborGrade'].domElement.value;
        fieldsMap['rstk__syusr_dfltcmpno__c'] = this.fieldElements['DefaultCompany'].domElement.value;
        fieldsMap['rstk__syusr_dfltdiv__c'] = this.fieldElements['DefaultDivision'].domElement.value;
        fieldsMap['rstk__syusr_salesdiv__c'] = this.fieldElements['DefaultDivision'].domElement.value;

        fieldsMap['rstk__syusr_allowlaborbooking__c'] = true;
        fieldsMap['rstk__syusr_allowqtybooking__c'] = true;

        insertRecord({ objectName: 'rstk__syusr__c', fieldValuePairs: fieldsMap }).then(result => {
            if(result) {
                alert("Record Inserted");
            }else {
                alert("Unable to Insert Record, Something Went Wrong");
                console.log("Unable to Insert record, something went wrong");
            }
        }).catch(err => {
            alert("Unable to Insert Record, Something Went Wrong");
            console.log(err);
        });
    }
}
