class CashDetailPage {

    elements = {
        reference: () => cy.get("input#cashDetailPayReference"),
        userEmail: () => cy.get("input#cashDetailUserEmail"),
        collectorCash: () => cy.get("input#cashDetailCollectorCash"),
        amount: () => cy.get("input#cashDetailAmount"),
        cellphone: () => cy.get("input#cashDetailCellphone"),
    }
}

module.exports = new CashDetailPage();