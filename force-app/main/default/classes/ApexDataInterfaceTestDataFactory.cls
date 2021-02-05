@isTest
public class ApexDataInterfaceTestDataFactory {
    // ------------------------------------------------------------------------------------------------
    // -------------------------------------- Opportunity Data ----------------------------------------
    // ------------------------------------------------------------------------------------------------
    public static List<Opportunity> loadOpportunityData() {
        List<Opportunity> opportunityData = new List<Opportunity>();

        opportunityData.add(
            new Opportunity(
                Name = 'TestOpportunity 1',
                CloseDate = Date.newInstance(2020, 11, 13),
                StageName = '7 - Closed Won - Delivered'
            )
        );

        opportunityData.add(
            new Opportunity(
                Name = 'TestOpportunity 2',
                CloseDate = Date.newInstance(2020, 7, 15),
                StageName = '1 - Needs Analysis'
            )
        );

        insert opportunityData;

        return opportunityData;
    }
}
