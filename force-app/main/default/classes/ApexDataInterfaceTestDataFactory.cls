@isTest
public class ApexDataInterfaceTestDataFactory {
    // ------------------------------------------------------------------------------------------------
    // -------------------------------------- Opportunity Data ----------------------------------------
    // ------------------------------------------------------------------------------------------------
    public static void loadOpportunityData() {
        List<Opportunity> opportunityData = new List<Opportunity>();

        opportunityData.add(
            new Opportunity(
                Name = 'TestOpportunity 1',
                //Id = '0064x000004SodAAAS',
                CloseDate = Date.newInstance(2020, 11, 13),
                StageName = 'Closed Won'
            )
        );

        opportunityData.add(
            new Opportunity(
                Name = 'TestOpportunity 2',
                //Id = '0064x000004SodEAAS',
                CloseDate = Date.newInstance(2020, 7, 15),
                StageName = 'Needs Analysis'
            )
        );

        //update opportunityData;
        insert opportunityData;
    }
}
