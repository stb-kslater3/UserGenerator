/*
*/

@isTest
private class ApexDataInterfaceTest {
  //----------------------------------------------------------------------------------
  //---------------------------- fieldsToSelect Tests --------------------------------
  // ---------------------------------------------------------------------------------

    @isTest
    static void testFieldsToSelect_BaseCase() {
    String[] fields = new List<String>{ 'Name', 'AccountId', 'RecordTypeId' };

    System.assertEquals(
      ApexDataInterface.fieldsToSELECT(fields),
      'Name, AccountId, RecordTypeId'
    );
  }



  //----------------------------------------------------------------------------------
  //--------------------------- getRecords Tests --------------------------------
  // ---------------------------------------------------------------------------------

  @isTest
  static void testGetRecords_BaseCase() {
    ApexDataInterfaceTestDataFactory.loadOpportunityData();

    Opportunity[] ops = ApexDataInterface.getRecords('Opportunity', new List<String> {'Name'}, 10);

    System.assert(ops.size() > 0);
  }

    
  //----------------------------------------------------------------------------------
  //--------------------------- getRecordsWhere Tests --------------------------------
  // ---------------------------------------------------------------------------------

  @isTest
  static void testGetRecordsWhere_BaseCase() {
    ApexDataInterfaceTestDataFactory.loadOpportunityData();

    List<String> fields = new List<String>();
    fields.add('Name');
    fields.add('Id');

    Map<String, Object> whereValuePairs = new Map<String, Object>();
    //whereValuePairs.put('Id', '0064x000004SodAAAS'); 
    whereValuePairs.put('StageName', 'Closed Won');

    Opportunity[] ops = ApexDataInterface.getRecordsWhere('Opportunity', fields, whereValuePairs, 10);
 
    System.assert(ops.size() > 0);
      
    System.assertEquals(ops[0].Name, 'TestOpportunity 1');
  }

/*
  //----------------------------------------------------------------------------------
  //--------------------------- getRecordFromId Tests --------------------------------
  // ---------------------------------------------------------------------------------

    @isTest
    static void testGetRecordFromId_BaseCase() {
      ApexDataInterfaceTestDataFactory.loadOpportunityData();

      Opportunity op = (Opportunity) ApexDataInterface.getRecordFromId('Opportunity', '0064x000004SodAAAS', new List<String> {'Name'});

      System.assertEquals(op.Name, 'TestOpportunity 1');
    }

    @isTest
    static void testGetRecordFromId_NoRecordExists() {
      ApexDataInterfaceTestDataFactory.loadOpportunityData();

      Opportunity op = (Opportunity) ApexDataInterface.getRecordFromId('Opportunity', '0014x000009ZZhMAAW', new List<String> {'Name'});

      System.assertEquals(op, null);
    }



  //----------------------------------------------------------------------------------
  //--------------------------- updateRecordFromId Tests --------------------------------
  // ---------------------------------------------------------------------------------

  @isTest
    static void testUpdateRecordFromId_BaseCase() {
      ApexDataInterfaceTestDataFactory.loadOpportunityData();

  // Make sure that the name is not the value I want to test after record updates
      Opportunity op = (Opportunity) ApexDataInterface.getRecordFromId('Opportunity', '0064x000004SodAAAS', new List<String> {'Name'});

      System.assertNotEquals(op.Name, 'New Name');


  // Update the name
      Boolean isUpdated = ApexDataInterface.updateRecordFromId('Opportunity', '0064x000004SodAAAS', new Map<String, Object> {'Name'=>'New Name'});

      System.assert(isUpdated);


  // Make sure the name is changed
      op = (Opportunity) ApexDataInterface.getRecordFromId('Opportunity', '0064x000004SodAAAS', new List<String> {'Name'});

      System.assertEquals(op.Name, 'New Name');
    }


    @isTest
    static void testUpdateRecordFromId_NoRecordExists() {
      ApexDataInterfaceTestDataFactory.loadOpportunityData();

      Boolean isUpdated = ApexDataInterface.updateRecordFromId('Opportunity', '0014x000009ZZhMAAW', new Map<String, Object> {'Name'=>'Unreal Record Name'});

      System.assertEquals(isUpdated, false);
    }
*/

  //----------------------------------------------------------------------------------
  //---------------------------- insertRecord Tests ----------------------------------
  // ---------------------------------------------------------------------------------
  
  @isTest
  static void testInsertRecord_BaseCase() {
    ApexDataInterfaceTestDataFactory.loadOpportunityData();

    // How many opportunities before Insert
    List<Opportunity> preLoadedOpportunities = [
      SELECT Name
      FROM Opportunity
    ];

    Boolean isInserted = ApexDataInterface.insertRecord('Opportunity', new Map<String, Object> {'Name'=>'Inserted Opportunity', 'CloseDate'=>Date.newInstance(2018, 7, 4), 'StageName'=>'Closed Lost'});

    System.assert(isInserted);

    // How many opportunities after Insert
    List<Opportunity> afterLoadedOpportunities = [
      SELECT Name
      FROM Opportunity
    ];

    System.assert(preLoadedOpportunities.size() < afterLoadedOpportunities.size());
  }
}