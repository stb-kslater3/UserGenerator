import { LightningElement, track } from 'lwc';

export default class UserGenerator_Main extends LightningElement {
    @track newUser_FieldsTable;
    @track newUser_HiddenFields;

    hiddenFieldIndices;
    fieldValuePairs;

    connectedCallback() {
        this.fieldValuePairs = {};

        this.newUser_FieldsTable = [];

        this.newUser_FieldsTable.push({
            rowkey: 0,

            cells: [
                {
                    cellkey: 0,
                    fieldName: 'FirstName',
                    colspan: 1
                },

                {
                    cellkey: 1,
                    fieldName: 'LastName',
                    colspan: 1
                }
            ]
        });

        this.hiddenFieldIndices = {};

        this.newUser_HiddenFields = [];

        this.newUser_HiddenFields.push({
            fieldName: 'Alias',
            fieldValue: ''
        });
        this.hiddenFieldIndices['Alias'] = 0;

        this.newUser_HiddenFields.push({
            fieldName: 'Nickname',
            fieldValue: ''
        });
        this.hiddenFieldIndices['Nickname'] = 0;
    }


    newUser_ValueChangeHandler(event) {
//console.log('Recieved value ' + event.detail.fieldValue + ' for object ' + event.detail.fieldName);


        switch(event.detail.fieldName) {
            case 'FirstName':
//console.log('First Name Changed');

                this.fieldValuePairs['FirstName'] = event.detail.fieldValue;
                this.generateFromName();
                break;

            
            case 'LastName':
//console.log('Last Name Changed');

                this.fieldValuePairs['LastName'] = event.detail.fieldValue;
                this.generateFromName();
                break;


            default:
                break;
        }


//console.log(this.fieldValuePairs);
console.log('New User {' +
                '\n\tFirstName: ' + this.fieldValuePairs['FirstName'] +
                '\n\tLastName: ' + this.fieldValuePairs['LastName'] +
                '\n\tAlias: ' + this.fieldValuePairs['Alias'] +
                '\n\tNickname: ' + this.fieldValuePairs['Nickname'] +
            '\n}');
    }


    generateFromName() {
        if(this.fieldValuePairs['FirstName'] && this.fieldValuePairs['LastName']) {
            if(this.fieldValuePairs['FirstName'].length > 0 && this.fieldValuePairs['LastName'].length > 0) {
                let lowerFirstName = this.fieldValuePairs['FirstName'].toLowerCase();
                let lowerLastName = this.fieldValuePairs['LastName'].toLowerCase();

                this.newUser_HiddenFields[this.hiddenFieldIndices['Alias']].fieldValue = lowerFirstName + lowerLastName;
                this.fieldValuePairs['Alias'] = this.newUser_HiddenFields[this.hiddenFieldIndices['Alias']].fieldValue;

                this.newUser_HiddenFields[this.hiddenFieldIndices['Nickname']].fieldValue = lowerFirstName + '.' + lowerLastName;
                this.fieldValuePairs['Nickname'] = this.newUser_HiddenFields[this.hiddenFieldIndices['Nickname']].fieldValue;
            }
        }
    }
}