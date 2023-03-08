public with sharing class getObjectNames {
    @AuraEnabled(cacheable=true)
    public static List<String> getObjects() {
        List<String> sObjectNamebyLabel = new List<String>();
        for(SObjectType objectType : Schema.getGlobalDescribe().values()) {
            DescribeSObjectResult sObjectDescribe = objectType.getDescribe();
            if(sObjectDescribe.isAccessible() && sObjectDescribe.isQueryable() && sObjectDescribe.isCreateable() && sObjectDescribe.isSearchable()) {
                sObjectNamebyLabel.add(sObjectDescribe.getLabel() +' '+ sObjectDescribe.getName());
            }
        }        
        return sObjectNamebyLabel;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getObjectFields(String SObjectApiName){
        List<String> SobjectFields = new List<String>();
        Map<String, Schema.SObjectType> detail = Schema.getGlobalDescribe();
        for(Schema.SObjectField fields : detail.get(SObjectApiName).getDescribe().fields.getMap().Values()) {
            SobjectFields.add(fields.getDescribe().getName() + ' ' + fields.getDescribe().getName());
        }

        return SobjectFields;
    }

    @AuraEnabled(cacheable=true)
    public static List<sObject> getFieldsRows(String sObjectApiName, List<String> fields){
        String filedsString = String.join(fields, ',' );
        String querystring = 'SELECT Id, '+ filedsString +' FROM '+ sObjectApiName;
        return Database.query(querystring);
    }
}