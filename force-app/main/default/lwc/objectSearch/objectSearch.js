import { api, LightningElement, track, wire } from 'lwc';
import getObjects from '@salesforce/apex/getObjectNames.getObjects';
import getObjectFields from '@salesforce/apex/getObjectNames.getObjectFields';
import getFieldsRows from '@salesforce/apex/getObjectNames.getFieldsRows';

export default class ObjectSearch extends LightningElement {
   @track searchOptionsNames;
   @track searchOptionsFields;
   @track selectedFields;
   @track rows;
   
   
   @track selected;
   selectedObjectName = '';
   selectedFieldsMap;
   error = undefined;
   columns;
   stringColumns;
   values = null;
   
   get selected() {
      return this.selectedFields ? true : false;
   }

   @wire(getObjects) 
   objectNames({data, error}) {
      if(data) {
         this.searchOptionsNames = data.map(obj => {
            return {label : obj.split(' ')[0], value : obj.split(' ')[1]};
         });
         this.error = null;
      }
      else if(error)
      {
         this.searchOptionsNames = null;
         this.error = error;
      }
   }

   @wire(getObjectFields, {SObjectApiName : '$selectedObjectName'}) 
   objectNamesFields({data, error}) {
      if(data) {
         this.searchOptionsFields = data.map(obj => {
            return {label : obj.split(' ')[0], value : obj.split(' ')[1]};
         });
         this.error = null;
      }
      else if(error)
      {
         this.searchOptionsFields = null;
         this.error = error;
      }
   }

   @wire(getFieldsRows, {sObjectApiName : '$selectedObjectName', fields : '$selectedFields'}) 
   objectNamesRows({data, error}) {
      if(data) {
         console.log(data);
         this.rows = data;
         this.error = null;
      }
      else if(error)
      {
         console.log(error);
         this.rows = null;
         this.error = error;
      }
   }

   handleSobjectNameChange(event)
   {
      this.selectedObjectName = event.target.value;
   }

   handleSelectedFields(event)
   {  
      this.columns = event.detail.value;
      console.log(this.columns);
      this.selectedFieldsMap = this.columns.map(element => {
         return {label : element, fieldName : element};
      });

      this.stringColumns = this.columns.map(element => {
         return element;
      });

      this.selectedFields = this.stringColumns;
      
      if(this.selectedFields.length == 0)
         this.selected = false;
      else 
         this.selected = true;
   }
}